// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({}) => ({
  base: '/',
  plugins: [react(),tailwindcss(),],
  server: {
    port: 5173,
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path
      },
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}))