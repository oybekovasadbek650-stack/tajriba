import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — `dist/index.html` ni fayl:// orqali ham ochsa bo'ladi.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5174, open: false }
});
