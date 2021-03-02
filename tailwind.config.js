module.exports = {
  purge: {
    enabled: true,
    content: [
      "./pages/**/*.js",
      "./components/**/*.js",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    zIndex: {
     '100': 100
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
