import { zIndexes, heights } from './src/utils/cssUtils.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    zIndex: zIndexes,
    height: heights,
    extend: {
      colors: {
        primary: 'var(--primary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        disabled: 'var(--text-disabled)',
      },
      backgroundColor: {
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
      },
    },
  },
  plugins: [],
};
