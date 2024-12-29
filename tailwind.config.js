import { zIndexes, heights } from './src/utils/cssUtils.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    zIndex: zIndexes,
    extend: {
      height: heights,
      margin: heights,
      padding: heights,
      spacing: heights,
      colors: {
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',
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
