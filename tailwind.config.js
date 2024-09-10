/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    backgroundImage: {
      'hero-pattern': "url(src/assets/rain.svg)",
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      nanum: ["Nanum Gothic Coding", "monospace"],
    },
    animation: {
      dropInTop: "dropInFromTop 0.5s ease-in-out",
      elementFadeInAndOut:
        "0.5s ease-in-out fadeIn, 0.5s ease-in-out 4.6s fadeOut",
      spin: "spin 1s linear infinite;",
      imageCarouselLeft: "bannerMoveLeft 20s linear infinite",
      imageCarouselRight: "bannerMoveRight 10s linear infinite",
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    keyframes: (theme) => ({
      dropInFromTop: {
        "0%": { opacity: 0, transform: "translateY(-50px)" },
        "100%": { opacity: 1 },
      },
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      fadeOut: {
        "0%": { opacity: 1 },
        "100%": { opacity: 0 },
      },
      spin: {
        "0%": {
          transform: "rotate(0deg)"
        },
        "100%": {
          transform: "rotate(360deg)"
        }
      },
    }),
  },
  plugins: [],
};
