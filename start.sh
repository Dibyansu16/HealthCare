#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# start.sh — Run this once to share your app with your team via ngrok
# Usage:  bash start.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e
cd "$(dirname "$0")"   # always run from the health/ folder

echo ""
echo "══════════════════════════════════════════════"
echo "  Step 1: Building frontend..."
echo "══════════════════════════════════════════════"
npm run build
echo "✓ Frontend built → dist/"

echo ""
echo "══════════════════════════════════════════════"
echo "  Step 2: Starting FastAPI on port 8000..."
echo "══════════════════════════════════════════════"
# Kill any old uvicorn
pkill -f "uvicorn src.trans" 2>/dev/null || true
sleep 1

# Start uvicorn in background
uvicorn src.trans:app --host 0.0.0.0 --port 8000 &
UVICORN_PID=$!
echo "✓ FastAPI started (PID $UVICORN_PID)"
sleep 3   # wait for models to load

echo ""
echo "══════════════════════════════════════════════"
echo "  Step 3: Starting ngrok tunnel on port 8000..."
echo "══════════════════════════════════════════════"
# Kill any old ngrok
pkill -f ngrok 2>/dev/null || true
sleep 1

# Start ngrok and grab the public URL
ngrok http 8000 --log=stdout --log-format=json > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!

# Wait for ngrok to be ready and extract the URL
echo "Waiting for ngrok URL..."
NGROK_URL=""
for i in {1..15}; do
    sleep 2
    NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels 2>/dev/null \
        | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['tunnels'][0]['public_url'])" 2>/dev/null || echo "")
    if [ -n "$NGROK_URL" ]; then
        break
    fi
done

echo ""
echo "══════════════════════════════════════════════"
if [ -n "$NGROK_URL" ]; then
    echo "  ✓ ALL DONE! Share this URL with your team:"
    echo ""
    echo "    👉  $NGROK_URL"
    echo ""
    echo "  Everything runs through this single URL:"
    echo "    Frontend  →  $NGROK_URL/"
    echo "    Translate →  $NGROK_URL/translate"
    echo "    Chat      →  $NGROK_URL/chat"
else
    echo "  ⚠ ngrok URL not detected automatically."
    echo "  Open http://127.0.0.1:4040 in browser to get your URL."
fi
echo "══════════════════════════════════════════════"
echo ""
echo "Press Ctrl+C to stop everything."

# Wait and clean up on exit
trap "echo 'Stopping...'; kill $UVICORN_PID $NGROK_PID 2>/dev/null; exit 0" INT TERM
wait $UVICORN_PID