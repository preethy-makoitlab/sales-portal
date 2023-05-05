/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,ts,js,tsx,jsx}",
    './pages/**/*.{html,ts,js,tsx,jsx}',
    './components/**/*.{html,ts,js,tsx,jsx}', './*.{html,js,ts,jsx}', './src/**/*.html',
    './src/**/*.ts', './dist/frontend/index.html', './dist/frontend/*.css', './dist/frontend/*.js',
    './src/**/*.{html,ts}'
  ],
  rippleui: {
    defaultStyle: false,
  },
  theme: {
    extend: {
      // fontFamily: {
      //   "font-poppins": ['Poppins']
      // }
    },
    container: {
      center: true,
    }
  },
  plugins: [require("rippleui")]
}
// plugins: [require("rippleui")]

// module.exports = {
//   prefix: 'tw-',
//   content: ["./src/**/*.{html,ts,js}",
//     './pages/**/*.{html,ts,js}',
//     './components/**/*.{html,ts,js}', './*.{html,js,ts}'],

//   rippleui: {
//     defaultStyle: false,
//   },
//   theme: {
//     extend: {
//       fontFamily: {
//         "font-poppins": ['Poppins']
//       }
//     }
//   },
//   variants: {
//     extend: {}
//   },
//   plugins: [
//     require("rippleui")({
//       flat: true,
//       squared: true,
//       disabled: true
//     })
//   ]
// };

// module.exports = {
//   mode: 'jit',
//   purge: [
//     './src/**/*.{html,ts}',
//   ],
//   rippleui: {
//     defaultStyle: false,
//   },
//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//       },
//     },
//   },
//   variants: {},
//   plugins: [require("rippleui")]
// };
