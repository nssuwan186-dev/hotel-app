import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hotel-app/', // Set this to your repository name
  root: './public', // Explicitly tell Vite where to find index.html
  build: {
    outDir: '../dist', // Output to a 'dist' folder outside the public folder
  },
})