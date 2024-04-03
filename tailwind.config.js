/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Inter',
      raleway: 'Raleway'
    },
    extend: {
      height: {
        screen: '100dvh'
      },
      colors: {
        'blue-main': '#4B69FD',
        'red-main': '#FF5613',
        'footer-grey': '#475467',
        'toast-green': '#01E17B',
        'toast-yellow': '#FFD21F',
        'toast-red': '#F04349'
      }
    }
  },
  plugins: []
}
