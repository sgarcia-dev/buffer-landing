/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(44, 75, 255)',
        'primary-faded': 'rgb(107, 129, 255)',
        'primary-light': 'rgb(213, 219, 255)',
        secondary: 'rgb(233, 114, 132)',
        'secondary-light': 'rgb(249, 215, 220)',      },
    },
  },
  plugins: [],
}
