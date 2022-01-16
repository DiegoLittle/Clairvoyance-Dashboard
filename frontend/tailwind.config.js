module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        
          themeBlue: {
          100: "#d4e3fc",
          200: "#a9c7f9",
          300: "#7daaf6",
          400: "#528ef3",
          500: "#2772f0",
          600: "#1f5bc0",
          700: "#174490",
          800: "#102e60",
          900: "#081730"
},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
