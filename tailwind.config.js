import typography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate' // <--- Import di sini// tailwind.config.js
module.exports = {
darkMode: 'class', // TAMBAHKAN BARIS INI
theme: {
  extend: {

          typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              'scroll-margin-top': '100px',
            },
          },
        },
          }),
    animation: {
      "spin-slower": "spin 60s linear infinite",
      "spin-reverse": "spinReverse 40s linear infinite",
    },
    keyframes: {
      spinReverse: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(-360deg)" },
      },
    },
  },
},
content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

plugins: [
  [tailwindAnimate], [typography],
],
  
}