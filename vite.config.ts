import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Base path para GitHub Pages (ajuste para o nome do seu repositório)
  base: mode === 'production' ? '/frontend-xss-demo/' : '/',
}))
