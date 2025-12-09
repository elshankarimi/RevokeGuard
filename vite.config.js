import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 💡 حل مشکل صفحه سیاه با استفاده از مسیرهای نسبی (Relative Path)
  base: './', 
  
  build: {
    outDir: 'dist', 
  },
});
