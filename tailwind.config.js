import { zIndexes } from './src/utils/css.ts';
import { theme } from './src/libs/mui/theme.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: zIndexes,
      colors: {
        primary: theme.palette.primary.main,
      },
      backgroundColor: {
        primary: theme.palette.background.default,
        secondary: theme.palette.mode === 'light' ? '#f1f3f5' : '#1c1c1c',
      },
      keyframes: {
        loadingPulse: { '100%': { transform: 'scale(10)', opacity: 0 } },
      },
    },
  },
  plugins: [],
};
