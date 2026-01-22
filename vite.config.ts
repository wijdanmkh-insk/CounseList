import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    host: true, // Expose to network
    port: 5174,
    hmr: {
      protocol: 'wss', // Use secure websocket for forwarded ports
      host: 'localhost',
    },
    watch: {
      usePolling: true, // Enable polling for file changes
    }
  }
})
