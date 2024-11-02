import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
  ],
  optimizeDeps: {
    entries: ['resources/js/app.tsx'], // Explicit entry files
  },
  build: {
    rollupOptions: {
      input: {
        main: 'resources/js/app.tsx', // Define your entry point explicitly
        style: 'resources/css/app.css',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/resources/js', // Add alias for easier imports (optional)
    },
  },
});