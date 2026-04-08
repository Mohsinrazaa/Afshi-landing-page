/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A962",
          light: "#E8D5A3",
          dim: "rgba(201,169,98,0.15)",
        },
        rose: {
          DEFAULT: "#D4A59A",
          light: "#E8C4BC",
        },
        obsidian: "#0a0a0a",
        charcoal: "#141414",
        graphite: "#1a1a1a",
        ink: "#0f0f0f",
        cream: {
          DEFAULT: "#F5F0E6",
          warm: "#F0E8D8",
        },
        taupe: {
          DEFAULT: "#8A8075",
          light: "#A69C91",
        },
        sage: "#7A8B6E",
      },

      fontFamily: {
        serif: ["Cormorant Garamond", "Noto Nastaliq Urdu", "serif"],
        sans: ["Inter", "Jost", "sans-serif"],
        mono: ["Space Grotesk", "sans-serif"],
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.33, 1, 0.68, 1) forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};