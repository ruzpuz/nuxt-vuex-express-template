module.exports = {
  srcDir: 'app/view/',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  head: {
    script: [
      { rel: 'preload', src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=272927363052551&autoLogAppEvents=1' },
      { rel: 'preload', src: 'https://apis.google.com/js/platform.js' }
    ],
    meta: [
      { name: 'google-signin-client_id', content: ' 852540476726-82o0j1a88g88sqbs7i6p2irmo6l7vgak.apps.googleusercontent.com  ' }
    ]
  },
  axios: {
    port: 3010
  },
  router: {
    middleware: [ 'security', 'redirection' ]
  }
};

