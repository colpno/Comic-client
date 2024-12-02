import { zIndexes, heights } from './src/utils/cssUtils.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    zIndex: zIndexes,
    extend: {
      height: heights,
      margin: heights,
      padding: heights,
      colors: {
        primary: 'var(--primary)',
      },
      textColor: {
        main: 'var(--text-primary)',
        disabled: 'var(--text-disabled)',
      },
      backgroundColor: {
        main: 'var(--background-primary)',
        sub: 'var(--background-secondary)',
      },
    },
  },
  plugins: [],
};
