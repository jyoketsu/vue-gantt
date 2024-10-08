/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./.vitepress/**/*.{js,ts,vue}",
    "./**/*.{md,html}",
  ],
  theme: {
    extend: {
      height: {
        "collapsed-menu-height": "calc(-118px + 100vh)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
