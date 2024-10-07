/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f50000',
      },
      backgroundColor: {
        primary: '#fff',
        secondary: '#f1f3f5',
      },
      keyframes: {
        loadingPulse: { '100%': { transform: 'scale(10)', opacity: 0 } },
      },
    },
  },
  plugins: [],
};
