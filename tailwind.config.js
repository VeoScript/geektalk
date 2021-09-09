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
        'cyber-dim': '#222222',
        'cyber-green': '#00FE00',
      },
      fontFamily: {
        firacode: ['Fira Code', ...defaultTheme.fontFamily.mono],
      }
    },
  },
  variants: {
    opacity: ['disabled']
  },
  plugins: [],
}