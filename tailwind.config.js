/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "darkbg-blue-100": "#141E30",
        "darkbg-blue-200": "#203A43",
        "darkbg-blue-300": "#243B55",
        "lightbg-blue-100": "#2E86AB",
        "lightbg-blue-200": "#4FACD7",
        
      }
    },

  },
  plugins: [],
};
