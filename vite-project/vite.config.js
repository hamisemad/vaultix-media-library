import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/vaultix-media-library/',
  plugins: [react()],
  build: {
  },
})
