/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
          colors: {
            'main': 'rgba(200, 26, 170, 0.89);',
            'main-disabled': 'rgba(200, 26, 170, 0.62);',
            'main-hover': '#f51dd0',
          },
        },
    },
    plugins: [],
}