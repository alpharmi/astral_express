/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "md": {"max": "1300px"},
      "sm": {"max": "900px"}
    },
    extend: {
      colors: {
        "bg": "var(--bg)",
        "container": "var(--container)",
        "title": "var(--title)",
        "description": "var(--description)",
        "legendary": "var(--legendary)",
        "rare": "var(--rare)",
        "pink": "var(--pink)"
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
