/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'serif'], 
      },
    },
  },
  plugins: [require ('daisyui')],
}

