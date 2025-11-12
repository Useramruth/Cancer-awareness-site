/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5f5',
          100: '#ffecec',
          200: '#ffc6c6',
          300: '#ff9f9f',
          400: '#ff6f6f',
          500: '#ef4444', // accent
          600: '#dc2626',
          700: '#b91c1c'
        }
      },
      spacing: {
        '128': '32rem'
      },
      borderRadius: {
        'xl2': '1.25rem'
      }
    }
  },
  plugins: []
}
