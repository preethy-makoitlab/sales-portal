/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,ts,js}",
    './pages/**/*.{html,ts,js}',
    './components/**/*.{html,ts,js}', './*.{html,js,ts}'],

  rippleui: {
    defaultStyle: false,
  },
  theme: {
    extend: {
      fontFamily: {
        "font-poppins": ['Poppins']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("rippleui")({
      flat: true,
      squared: true,
      disabled: true
    })
  ]
};

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{html,ts,js}',
    './dist/**/*.{html,ts,js}',
  ],
  rippleui: {
    defaultStyle: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [require("rippleui")]
};
