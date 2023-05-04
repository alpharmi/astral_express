/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "calcBp1": [{"min": "1419px", "max": "1781px"}, {"max": "1096px"}],
      "calcBp2": {"max": "1418px"}
    },
    extend: {
      colors: {
        "bg": "var(--bg)",
        "container": "var(--container)",
        "title": "var(--title)"
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
