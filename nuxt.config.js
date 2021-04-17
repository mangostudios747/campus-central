import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Campus Central',
    title: 'Campus Central',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-linkify.js',
    '~/plugins/vue-moment.js'
  ],

  serverMiddleware: [
    '~/server-middleware/api/app.js',
    //'~/server-middleware/auth.js'

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDjLQAzre_M7puZsitnnXhu7uH6M-JIerc",
          authDomain: "homeworkcentral.firebaseapp.com",
          databaseURL: "https://homeworkcentral.firebaseio.com",
          projectId: "homeworkcentral",
          storageBucket: "homeworkcentral.appspot.com",
          messagingSenderId: "709390643857",
          appId: "1:709390643857:web:7ee7ad222cf5f2ba9f4530"
        },
        services: {
          database: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:process.env.RHOST || 'http://localhost:3000'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      theme_color:'#0F3261',
      short_name: 'Campus Central',
      name: 'Campus Central',
      start_url:'/app?standalone=true',
      background_color: '#04173B'
    },
    meta: {
      name: 'Campus Central',
      description: 'A clean and intuitive interface for Schoology, Campus Central is your new go-to app during class.',
      theme_color:'#0F3261',
      ogSiteName:'CampusCentral.repl.co',
      ogHost: 'https://campuscentral.repl.co',
      mobileAppIOS:true,
      appleStatusBarStyle:'black-translucent',
      ogImage:true
    }
  },

  router:{
    //middleware:'redirectMessages'
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options:{
        customProperties: true
      },
      themes: {
        dark: {
          primary: '#3066C7',
          accent: '#e0897b',
          accentDark:'#8F321E',
          secondary: '#0F3261',
          tertiary:'#04173B',
          blueLayer:'#071F45',
          text: '#fff',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,


        },
        light: {
          primary: '#3066C7',
          accent: '#A25247'||'#b7453b',
          accentDark:'#e0897b',
          secondary: '#dde2ee',
          tertiary:'#ccd9ef',
          blueLayer:'#c3d6f8',
          text:'#04173B',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  privateRuntimeConfig: {
    //  basically dotenv but not
    RHOST: process.env.RHOST || 'http://192.168.50.125:3000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    host: process.env.NODE_ENV === 'production'? '0':null, // default: localhost
    port: process.env.PORT || '3000'
  }
}
