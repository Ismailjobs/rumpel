/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#353535",
        accent: "#3c6e71",
        "accent-hover": "#2d5a5d",
        "gray-light": "#d9d9d9",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
