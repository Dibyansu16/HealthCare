from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel
import torch
import httpx
import os
import json
import re
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit.processor import IndicProcessor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

TRANS_DEVICE = "cpu"

print("Loading Indic->English model on CPU...")
i2e_model = AutoModelForSeq2SeqLM.from_pretrained(
    "ai4bharat/indictrans2-indic-en-dist-200M", trust_remote_code=True
).to(TRANS_DEVICE)
i2e_model.eval()
i2e_tokenizer = AutoTokenizer.from_pretrained(
    "ai4bharat/indictrans2-indic-en-dist-200M", trust_remote_code=True
)

print("Loading English->Indic model on CPU...")
e2i_model = AutoModelForSeq2SeqLM.from_pretrained(
    "ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True
).to(TRANS_DEVICE)
e2i_model.eval()
e2i_tokenizer = AutoTokenizer.from_pretrained(
    "ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True
)

ip = IndicProcessor(inference=True)
print("All models loaded. Ready.")


# ── Helpers ───────────────────────────────────────────────────────────────────

def translate(text: str, direction: str) -> str:
    """Translate a single string. Used internally for streaming pipeline."""
    if direction == "to_en":
        src, tgt, model, tokenizer = "ory_Orya", "eng_Latn", i2e_model, i2e_tokenizer
    else:
        src, tgt, model, tokenizer = "eng_Latn", "ory_Orya", e2i_model, e2i_tokenizer

    batch = ip.preprocess_batch([text], src_lang=src, tgt_lang=tgt)
    tokenizer.src_lang = src
    inputs = tokenizer(
        batch, truncation=True, padding="longest", return_tensors="pt"
    ).to(TRANS_DEVICE)

    with torch.no_grad():
        generated_tokens = model.generate(
            **inputs, num_beams=1, use_cache=False, max_length=256,
        )

    result = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)
    return ip.postprocess_batch(result, lang=tgt)[0]


def sse(data: dict) -> str:
    """Format a Server-Sent Event (SSE) message."""
    return f"data: {json.dumps(data)}\n\n"


# ── Pydantic Models ───────────────────────────────────────────────────────────

class TranslationRequest(BaseModel):
    text: str
    direction: str  # "to_en" or "to_or"

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama3"


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/health")
async def health_check():
    return {"status": "ok", "device": TRANS_DEVICE}


@app.post("/translate")
async def translate_endpoint(request: TranslationRequest):
    result = translate(request.text, request.direction)
    return {"translated_text": result}


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    English streaming: streams Ollama tokens directly to frontend via SSE.
    Frontend displays words as they arrive — no waiting for full response.
    """
    async def generate():
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                "http://127.0.0.1:11434/api/generate",
                json={"model": request.model, "prompt": request.prompt, "stream": True},
            ) as resp:
                async for line in resp.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        chunk = json.loads(line)
                        token = chunk.get("response", "")
                        done = chunk.get("done", False)
                        if token:
                            yield sse({"token": token, "done": False})
                        if done:
                            yield sse({"token": "", "done": True})
                            break
                    except json.JSONDecodeError:
                        continue

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.post("/chat/stream-odia")
async def chat_stream_odia(request: ChatRequest):
    """
    Odia streaming pipeline:
      1. Stream tokens from Ollama, buffer into sentences
      2. When a sentence is complete, translate EN→Odia immediately
      3. Stream the Odia sentence to frontend right away
    User sees each Odia sentence appear one by one instead of waiting for all.
    """
    # Sentence boundary: ends with . ! ? or newline
    SENTENCE_END = re.compile(r'(?<=[.!?\n])\s*')

    async def generate():
        buffer = ""
        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                "http://127.0.0.1:11434/api/generate",
                json={"model": request.model, "prompt": request.prompt, "stream": True},
            ) as resp:
                async for line in resp.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        chunk = json.loads(line)
                        token = chunk.get("response", "")
                        done = chunk.get("done", False)

                        buffer += token

                        # Check if buffer contains a complete sentence
                        parts = SENTENCE_END.split(buffer)

                        if len(parts) > 1:
                            # Translate all complete sentences
                            for sentence in parts[:-1]:
                                sentence = sentence.strip()
                                if not sentence:
                                    continue
                                # Translate this sentence to Odia
                                odia_sentence = translate(sentence, "to_or")
                                yield sse({"sentence": odia_sentence, "done": False})
                            # Keep the incomplete last part in buffer
                            buffer = parts[-1]

                        if done:
                            # Translate any remaining text in buffer
                            if buffer.strip():
                                odia_sentence = translate(buffer.strip(), "to_or")
                                yield sse({"sentence": odia_sentence, "done": False})
                            yield sse({"sentence": "", "done": True})
                            break

                    except json.JSONDecodeError:
                        continue

    return StreamingResponse(generate(), media_type="text/event-stream")


# ── Serve Vite build (must be LAST) ──────────────────────────────────────────
DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "dist")

if os.path.exists(DIST_DIR):
    print(f"Serving frontend from: {DIST_DIR}")
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

    @app.get("/favicon.ico")
    async def favicon():
        return FileResponse(os.path.join(DIST_DIR, "favicon.ico"))

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        return FileResponse(os.path.join(DIST_DIR, "index.html"))
else:
    print("WARNING: dist/ not found. Run 'npm run build' first.")