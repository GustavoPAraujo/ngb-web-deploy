/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm-500': '500px',
        'md-900': '900px',
      },
    },
  },
  plugins: [],
}

