/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "link-blue": "#bcddff",
        "uses-yellow": "#ffc600",
        "uses-underline": "#eb4471",
      },
      height: {
        "50vh": "50vh",
        "45vh": "45vh",
      },
      fontSize: {
        "154%": "154%",
      },
      scale: {
        470: "4.7",
        500: "5",
      },
      spacing: {
        "10vh": "10vh",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".webkit-scrollbar-none": {
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
        },
        ".play-button::after": {
          content: '"▶"',
          position: "absolute",
          left: "50%",
          top: "50%",
          color: "white",
          "border-radius": "50%",
          background: "rgba(100, 100, 100, 0.4)",
          transform: "scale(4.7)",
          height: "2em",
          width: "2em",
          display: "flex",
          "justify-content": "center",
          transition: "transform ease 0.2s",
          "align-items": "center",
        },
        ".play-button:hover::after": {
          transform: "scale(5)",
          background: "rgba(100, 100, 100, 0.6)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
