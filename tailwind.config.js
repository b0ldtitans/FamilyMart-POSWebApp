/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary": "#01AB52",
        "secondary": "#1F94D2"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
