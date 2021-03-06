const plugin = require('tailwindcss/plugin');

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
        maxHeight: {
            'data-structure-layout': 'calc(100vh - 89px)'
        },
        height: {
            'px': '1px',
            'px-1/2': '0.5px'
        },
        boxShadow: {
            main: '0 3px 4px 2px rgba(0, 98, 255, 0.25)'
        },
        transitionProperty: {
            'height': 'height',
            'colors-shadow': 'background-color, border-color, color, fill, stroke, box-shadow'
        },
        zIndex: {
            'negative': '-1'
        },
        cursor: {
            grab: 'grab'
        }
    },
  },
  variants: {
    extend: {
        ringWidth: ['hover'],
        ringColor: ['hover'],
        ringOpacity: ['hover'],
        textColor: ['group-focus'],
        backgroundColor: ['group-focus'],
        borderWidth: ['not:first', 'hover'],
        borderColor: ['not:first', 'hover'],
        margin: ['not:first', 'first'],
        padding: ['not:first']
    },
  },
  plugins: [
      plugin(function({ addVariant, e }) {
          addVariant('not:first', ({ modifySelectors, separator }) => {
              modifySelectors(({ className }) => {
                  return `.${e(`not:first${separator}${className}`)}:not(:first-child)`
              })
          })
      })
  ],
}
