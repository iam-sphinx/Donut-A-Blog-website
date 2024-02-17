/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scrollIn: {
          from: {
            "bottom":"0px"
          },
          to: {
            "bottom":"288px;"
          },
        },
        scrollOut: {
          from: {
            "bottom":"288px;",
          },
          to: {
            "bottom": "0px;",
          },
        },
      },
      animation: {
        scrollIn: "scrollIn 1s ease-in-out",
        scrollOut: "scrollOut 1s ease-in-out",
      },
    },
    fontFamily: {
      "poor-story": ["Poor Story", "system-ui"],
      "single-day": ["Single Day", "cursive"],
      caveat: ["Caveat", "cursive"],
      "dancing-script": ["Dancing Script", "cursive"],
      oxygen: ["Oxygen", "sans-serif"],
      Dosis: ["Dosis", "sans-serif"],
    },
  },
  plugins: [],
};
