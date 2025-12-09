import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable source maps for production debugging
    sourcemap: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'react-hot-toast'],
          charts: ['recharts'],
          forms: ['react-hook-form', 'zod'],
        },
      },
    },
    // Optimize build
    minify: 'terser',
  },
  // Optimize development server
  server: {
    port: 5173,
    host: true,
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
})
