/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens:{
      sm:'390px',
      md:'768px',
      lg:'976px',
      xl:'1440px',
    },

    fontFamily: {
      sans: ['General Sans', 'sans-serif'],
      serif: ['Newsreader', 'serif'],
      handwrite: ['Playpen Sans']
    },
    extend: {
      colors:{
        accentColor: '#4891CE',
        lightMode: '#F3F2FA',
        darkMode: '#050505',
        customGray: '#6E6E6E',
      },
      backgroundImage:{
        bg1: "url('/cta-bg.jpg')",
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
  ],
}


