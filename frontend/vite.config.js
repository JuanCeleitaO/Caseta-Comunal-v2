import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5177,
    host: true, // Esto es lo mismo que 0.0.0.0
    strictPort: true,
  }
})