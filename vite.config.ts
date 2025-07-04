// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/ahorrista': {
        target: 'http://198.211.105.95:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ahorrista/, ''),
      },
    },
  },
});