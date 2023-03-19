module.exports = {
  prefix: '',
  content: ['./src/**/*.{html,ts}'],
  important: true,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'fm-white': '#FFFAFA',
        'fm-orange': '#FF9966',
        'fm-red': '#E71D36',
        'fm-green': '#3EB489',
        'fm-black': '#011627',
        'fm-blue': '#0070BB',
        'fm-yellow': '#FADFAD',
        'fm-gray': '#E5E4E2',
      },
      borderColor: {
        DEFAULT: '#E5E4E2',
      },
      fontFamily: {
        ubuntu: ["'Ubuntu', sans-serif"],
        indieFlower: ["'Indie Flower', cursive"],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
