/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto Mono, monospace',
      },
      colors: {
        main: '#c11f24',
        second: '#efe3bc',
        accentGold: '#FFC107',
      },
      height: {
        screen: '100vh',
      },
    },
  },
  plugins: [],
};
