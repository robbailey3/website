module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: 'media',
  theme: {
    colors: {},
    extend: {
      fontFamily: {
        'sans-serif': ['Work Sans', 'Arial', 'Helvetica', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
});
