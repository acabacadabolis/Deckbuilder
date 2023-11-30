/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'yugi-pattern': "url('/public/_3b21f5ac-ca9b-40fe-ba8e-648577115c32.jpg')",
        'magic-texture': "url('/public/_de6248e2-0f8b-433b-8cb5-da0e95cb49ac.jpg')",
      }
    },
  },
  plugins: [],
}

