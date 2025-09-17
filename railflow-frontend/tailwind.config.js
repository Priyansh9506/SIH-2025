/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        railflow: {
          primary: '#38e07b',
          secondary: '#2fbc68',
          dark: '#111714',
          card: '#1a231e',
          input: '#29382f',
          text: '#9eb7a8',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'spline': ['Spline Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

