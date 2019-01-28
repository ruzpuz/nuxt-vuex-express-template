module.exports = {
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  },
  srcDir: 'app/view/',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-material-design-icons', [
      'nuxt-i18n', {
        locales: [
          { code: 'en', iso: 'en-US' },
          { code: 'fr', iso: 'fr-FR' }
        ],
        strategy: 'prefix',
        defaultLocale: 'en'
      }
    ]
  ],
  head: {
    script: [
      {
        rel: 'preload',
        src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=272927363052551&autoLogAppEvents=1'
      },
      { rel: 'preload', src: 'https://apis.google.com/js/platform.js' }
    ],
    meta: [
      {
        name: 'google-signin-client_id',
        content: ' 852540476726-82o0j1a88g88sqbs7i6p2irmo6l7vgak.apps.googleusercontent.com  '
      }
    ]
  },
  axios: {
    port: 3010
  },
  router: {
    middleware: [ 'security', 'redirection' ]
  }
};

