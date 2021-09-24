const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'cyber-white': '#FFFFFF',
        'cyber-black': '#080808',
        'cyber-dim': '#0C0C0C',
        'cyber-green': '#00FE00',
        'cyber-yellow': '#FFCE00',
        'cyber-violet': '#A164F0'
      },
      fontFamily: {
        synemono: ['Syne Mono', ...defaultTheme.fontFamily.serif],
      }
    },
  },
  variants: {
    opacity: ['disabled']
  },
  plugins: [],
}