module.exports = {
  purge: ['./pages/**/*.jsx', './pages/**/*.js', './components/**/*.jsx', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            primary: '#0062FF',
            'primary-light': '#DBE9FF',
            'primary-dark': '#004DC8',
            secondary: '#FFFFFF',
        },
        fontFamily: {
            serif: ['Inter', 'serif'],
            sans: ['Open Sans', 'sans-serif']
        },
        maxWidth: {
            container: '1600px'
        },
        boxShadow: {
            main: '0 4px 4px 0 rgba(0, 98, 255, 0.25)'
        },
        transitionProperty: {
            'height': 'height'
        },
        height: {
            content: 'fit-content'
        }
    },
  },
  variants: {
    extend: {
        ringWidth: ['hover'],
        ringColor: ['hover'],
        ringOpacity: ['hover']
    },
  },
  plugins: [],
}
