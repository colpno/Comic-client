/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        loadingPulse: { '100%': { transform: 'scale(10)', opacity: 0 } },
      },
    },
  },
  plugins: [],
};
