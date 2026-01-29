
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vite looks for this folder to copy static files (like logo.png) to dist/
  publicDir: 'public', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generates clean, production-ready code
    minify: 'esbuild',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});