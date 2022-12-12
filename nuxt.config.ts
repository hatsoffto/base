// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiUrl: '',
    public: {
      imagesUrl: process.env.NUXT_IMAGES_URL
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@nuxtjs/i18n'
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_API_URL + '/graphql'
      }
    }
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'nl',
        file: 'nl-NL.json'
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'nl'
  },

  imports: {
    dirs: ['graphql']
  },

  build: {
    transpile: ['@heroicons/vue']
  }
})
