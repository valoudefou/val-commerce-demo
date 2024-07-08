// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   plugins: [require('@tailwindcss/aspect-ratio')],
//   theme: {
//     extend: {
//       colors: {
//         'crash-yellow': '#d6ff00',
//       },
//     }
//   }
// }

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'crash-yellow': '#d6ff00',
      },
    },
  },
  plugins: [],
});