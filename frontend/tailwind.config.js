/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/**/*.{html,ts}'  // CHỈ quét file Angular: .html và .ts
  ],
  theme: {
    container: {
      center: true,
      padding: '12px',
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        xxl: '1320px'
      }
    },
    extend: {
      spacing: {
        'vw-3-88': '3.88888889vw',
        'vw-0-55': '0.55555556vw'
      }
    }
  },
  plugins: []
};
