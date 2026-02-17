import typography from '@tailwindcss/typography';

// tailwind.config.js
module.exports = {
darkMode: 'class', // TAMBAHKAN BARIS INI
theme: {
  extend: {
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
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
plugins: [
  require("tailwindcss-animate"), [typography],
],
  
}