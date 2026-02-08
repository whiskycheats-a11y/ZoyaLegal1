import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
