const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        telegram: '#229ED9',
        spotify: '#1DB954',
        facebook: '#1877f2',
        whatsapp: '#25D366',
        twitter: '#1DA1F2',
        intercom: '#334bfa',
        brand: {
          '400': '#5810B5',
          '500': '#510fa8',
          '600': '#450D8F'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            p: {
              marginTop: "0.3em",
              marginBottom: "1.2em",
            },
            li: {
              marginTop: "0",
              marginBottom: "0.4em",
            },
            h2: {
              marginTop: "0.6em",
              marginBottom: "0.4em",
            },
            h3: {
              marginTop: "0.6em",
              marginBottom: "0.4em",
            },
            strong: {
              fontWeight: "800"
            }
          },
        },
        lg: {
          css: {
            color: theme("colors.gray.900"),
            '[class~="lead"]': {
              color: theme("colors.gray.900"),
            },
            p: {
              marginTop: "0.4em",
              marginBottom: "1.4em",
            },
            li: {
              marginTop: "0",
              marginBottom: "0.4em",
            },
            h2: {
              marginTop: "0.6em",
              marginBottom: "0.4em",
            },
            h3: {
              marginTop: "0.6em",
              marginBottom: "0.4em",
            },
          },
        },
        light: {
          css: [
            {
              color: theme("colors.gray.200"),
              '[class~="lead"]': {
                color: theme("colors.gray.200"),
              },
              strong: {
                color: theme("colors.white"),
              },
              "ol > li::before": {
                color: theme("colors.gray.400"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600"),
              },
              hr: {
                borderColor: theme("colors.gray.200"),
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.600"),
              },
              h1: {
                color: theme("colors.white"),
              },
              h2: {
                color: theme("colors.white"),
              },
              h3: {
                color: theme("colors.white"),
              },
              h4: {
                color: theme("colors.white"),
              },
              "figure figcaption": {
                color: theme("colors.gray.400"),
              },
              code: {
                color: theme("colors.white"),
              },
              "a code": {
                color: theme("colors.white"),
              },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.white"),
                borderBottomColor: theme("colors.gray.400"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.600"),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}