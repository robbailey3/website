module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Work Sans', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        portafino: {
          50: '#fffffb',
          100: '#fffff7',
          200: '#ffffec',
          300: '#ffffe1',
          400: '#ffffca',
          500: '#FFFFB3',
          600: '#e6e6a1',
          700: '#bfbf86',
          800: '#99996b',
          900: '#7d7d58'
        },
        fire: {
          50: '#faf6f2',
          100: '#f6ece6',
          200: '#e8d0bf',
          300: '#dbb399',
          400: '#bf7b4d',
          500: '#A44200',
          600: '#943b00',
          700: '#7b3200',
          800: '#622800',
          900: '#502000'
        },
        'sahara-sand': {
          50: '#fefef8',
          100: '#fefdf2',
          200: '#fcf9de',
          300: '#fbf6cb',
          400: '#f7efa3',
          500: '#F4E87C',
          600: '#dcd170',
          700: '#b7ae5d',
          800: '#928b4a',
          900: '#78723d'
        },
        'glade-green': {
          50: '#f7f9f7',
          100: '#eff4ef',
          200: '#d7e2d8',
          300: '#bfd1c0',
          400: '#8eaf90',
          500: '#5E8C61',
          600: '#557e57',
          700: '#476949',
          800: '#38543a',
          900: '#2e4530'
        },
        'black-pearl': {
          50: '#f2f3f4',
          100: '#e6e8e9',
          200: '#c0c5c9',
          300: '#99a2a9',
          400: '#4d5c68',
          500: '#011627',
          600: '#011423',
          700: '#01111d',
          800: '#010d17',
          900: '#000b13'
        },
        'tall-poppy': {
          50: '#fbf2f4',
          100: '#f7e6e9',
          200: '#ebbfc7',
          300: '#df99a6',
          400: '#c84d63',
          500: '#b00020',
          600: '#9e001d',
          700: '#840018',
          800: '#6a0013',
          900: '#560010'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
});
