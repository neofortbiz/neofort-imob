/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2d7a3a',
          'green-dark': '#081c12',
          'green-mid': '#1a4d32',
          gold: '#e8b44e',
          'gold-dark': '#c8922a',
          blue: '#1565c0',
          wa: '#25a244',
        },
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        condensed: ['Barlow Condensed', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
