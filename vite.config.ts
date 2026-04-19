import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// Production default is '/' so hosts like Vercel/Netlify load JS/CSS from the site root.
// For GitHub Pages project URLs (…/repo-name/), set VITE_BASE_PATH when building, e.g.
// VITE_BASE_PATH=/frontend-xss-demo/ npm run build
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base:
    process.env.VITE_BASE_PATH ||
    (mode === 'production' ? '/' : '/'),
}))
