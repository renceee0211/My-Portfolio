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
      sans: ['General Sans', 'sans-serif']
    },
    extend: {
      colors:{
        accentColor: '#4891CE',
        lightMode: '#F3F2FA',
        darkMode: '050505',
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

