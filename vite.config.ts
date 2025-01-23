import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), babel({ filter: /\.tsx?$/ })],
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
          '@mui/icons-material': ['@mui/icons-material'],
          '@mui/material': ['@mui/material'],
          '@mui/x-data-grid': ['@mui/x-data-grid'],
          '@reduxjs/toolkit': ['@reduxjs/toolkit'],
          'react-redux': ['react-redux'],
          'swiper/react': ['swiper/react'],
          'react-icons': ['react-icons'],
          'react-hook-form': ['react-hook-form'],
        },
      },
    },
  },
});
