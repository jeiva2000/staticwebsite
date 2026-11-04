import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// "base" es la subruta de GitHub Pages: https://jeiva2000.github.io/staticwebsite/
export default defineConfig({
  plugins: [react()],
  base: '/staticwebsite/',
})
