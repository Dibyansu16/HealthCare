//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins:[react()],
  
  server: {
    port:5173,
    proxy:{      '/translate': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/chat': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/api/ollama':{target:'http://localhost:11434',changeOrigin:true,xfwd:true,
      rewrite:(path)=>path.replace(/^\/api\/ollama/, ''),
    },},
    host: true,         // Listen on all local IPs (0.0.0.0)
    strictPort: true,   // Keeps the port consistent for ngrok
    allowedHosts: ['unwailing-mutteringly-birgit.ngrok-free.dev',
                    '.ngrok-free.app', '.ngrok.io','iffxf-14-139-207-165.a.free.pinggy.link',
                    'wet-cow-90.telebit.io'
    ]
  },
  build: {
    // Output to health/dist/ which FastAPI will serve
    outDir: 'dist',
    sourcemap: false,},
})