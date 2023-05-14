const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundSize: {
        "size-110": "110% 110%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      screens: {
        "3xl": "1700px",
      },
      colors: {
        // primary: "#B4A3FD",
        // light: "#281E32",
        // dark: "#20073D",
        // darker: "#11041F",
        main: {
          DEFAULT: "#B10FFD",
          300: "#C600B2",
          400: "#B10FFD",
          500: "#4700A0",
          600: "#360448",
          700: "#190D29",
          800: "#1B0843",
          900: "#1A0D2A",
        },
        primary: "#DDFE15",
        secondary: "#15FEF0",
        danger: "#D84B8B",
      },
      fontFamily: {
        // sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        alfphabet: ["Alfphabet"],
        sans: ["ProductSans", ...defaultTheme.fontFamily.sans],
        productSans: ["ProductSans"],
        ivyPresto: ["IvyPresto"],
        michroma: ["Michroma"],
        circular: ["Circular"],
        //TODO: to be removed
        // gallient: ["Gallient"],
        // raleway: ["Raleway"],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(50% 50% at 50% 50%, rgba(36, 27, 69, 0.017) 0%, rgba(24, 22, 31, 0.054) 54.69%, rgba(0, 0, 0, 0.0869792) 100%)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-labeled-groups")(["social"]),
  ],
};
