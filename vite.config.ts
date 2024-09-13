import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), babel({ filter: /\.tsx?$/ })],
});
