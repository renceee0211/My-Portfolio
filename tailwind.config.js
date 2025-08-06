/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html'],

  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px',
    },

    fontFamily: {
      sans: ['DM Sans', 'sans-serif']
    },
    extend: {
      colors:{
        darkMode: '#121212',
        darkmode2: '#171717',
        lighterBlack: '#282828',
        mainTextCol: '#8b8b8b',
        accentColor: '#5953ce'
      },
      backgroundImage:{
        bg1: "url('assets/bg1.jpg')",
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
  ],
}

