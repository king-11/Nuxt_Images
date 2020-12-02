import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - P2P',
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    }, ],
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/transition.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/firebase.js'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login/',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/auth/me/',
            method: 'get',
            propertyName: false,
          },
          logout: false,
        },
        tokenRequired: true,
        tokenType: 'Token',
      },
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/',
        home: '/'
      }
    },
  },
  axios: {
    baseURL: 'https://wallpaper-apiv1.herokuapp.com/',
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  cookie: {
    prefix: "auth.",
    options: {
      sameSite: true
    }
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  }
}
