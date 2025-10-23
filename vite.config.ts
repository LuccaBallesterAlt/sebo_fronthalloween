import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: true
  },
  define: {
    // Garantir que as variáveis de ambiente sejam carregadas
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://sebo-api.vercel.app')
  }
})