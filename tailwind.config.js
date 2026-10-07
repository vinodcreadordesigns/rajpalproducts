/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#C8A96A",
        "gold-soft": "#E2C88B",
        maroon: "#7B1020",
        "maroon-soft": "#9A1A2D",
        silver: "#C6CBD6",
        obsidian: "#FFF9F1",
        "dark-brown": "#F4ECE0",
        cream: "#3E3328",
        beige: "#7A6C5B",
      },
      boxShadow: {
        luxury: "0 20px 45px rgba(200, 169, 106, 0.2)",
      },
      backgroundImage: {
        "luxury-gradient":
          "radial-gradient(circle at 20% 20%, rgba(200,169,106,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(198,203,214,0.25), transparent 30%), linear-gradient(120deg, #fff9f1, #f9f1e6 45%, #efe4d4)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(200,169,106,0.35)" },
          to: { boxShadow: "0 0 28px rgba(200,169,106,0.8)" },
        },
      },
    },
  },
  plugins: [],
};
