/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
