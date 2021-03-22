module.exports = {
  purge: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-blue": "#293F4F",
        "medium-blue": "#42637B",
        "light-grey": "#E7E7E7",
        "medium-grey": "#D1D7DC",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
