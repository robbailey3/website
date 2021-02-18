module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: 'media',
  theme: {
    colors: {
      primary: {
        DEFAULT: '#247BA0',
        50: '#6FBDDF',
        100: '#63B8DC',
        200: '#4AACD6',
        300: '#31A1D1',
        400: '#2A8EB9',
        500: '#247BA0',
        600: '#1E6887',
        700: '#19556E',
        800: '#134155',
        900: '#0E2E3C'
      },
      secondary: {
        DEFAULT: '#70C1B3',
        50: '#B0DDD5',
        100: '#A9DAD1',
        200: '#9BD4CA',
        300: '#8CCDC2',
        400: '#7EC7BB',
        500: '#70C1B3',
        600: '#5EB9AA',
        700: '#4DB1A0',
        800: '#459F90',
        900: '#3D8E80'
      },
      accent: {
        DEFAULT: '#D33E43',
        50: '#E4898C',
        100: '#E28084',
        200: '#DE7074',
        300: '#DB5F63',
        400: '#D74F53',
        500: '#D33E43',
        600: '#BD2B30',
        700: '#9C2428',
        800: '#7B1C1F',
        900: '#591417'
      },
      success: {
        DEFAULT: '#2A6041',
        50: '#6CBF8F',
        100: '#60B986',
        200: '#4BAB73',
        300: '#409263',
        400: '#357952',
        500: '#2A6041',
        600: '#224E35',
        700: '#1A3D29',
        800: '#132B1D',
        900: '#0B1911'
      },
      warning: {
        DEFAULT: '#ECA400',
        50: '#FFDC8E',
        100: '#FFD77C',
        200: '#FFCC58',
        300: '#FFC134',
        400: '#FFB611',
        500: '#ECA400',
        600: '#CD8F00',
        700: '#AF7900',
        800: '#906400',
        900: '#724F00'
      },
      dark: {
        DEFAULT: '#011936',
        50: '#02387A',
        100: '#023572',
        200: '#022E63',
        300: '#022754',
        400: '#012045',
        500: '#011936',
        600: '#011227',
        700: '#000B18',
        800: '#000409',
        900: '#000000'
      },
      light: {
        DEFAULT: '#EAEAEA',
        50: '#FFFFFF',
        100: '#FFFFFF',
        200: '#FFFFFF',
        300: '#F9F9F9',
        400: '#F2F2F2',
        500: '#EAEAEA',
        600: '#D8D8D8',
        700: '#C6C6C6',
        800: '#B4B4B4',
        900: '#A3A3A3'
      },
      transparent: 'transparent'
    },
    fontFamily: {
      mono: ['Roboto Mono', 'Courier New', 'Courier', 'monospace'],
      serif: ['Roboto Slab', 'Times New Roman', 'Times', 'serif']
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
});
