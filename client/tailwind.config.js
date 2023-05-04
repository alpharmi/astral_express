/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "calcBp1": [{"min": "1386px", "max": "1768px"}, {"max": "1052px"}],
      "calcBp2": {"max": "1385px"}
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
