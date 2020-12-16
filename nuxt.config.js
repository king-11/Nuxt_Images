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
    titleTemplate: '%s - Pictorial',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        lang: 'en',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'dns-fetch',
        href: 'https://cdn.jsdelivr.net',
      },
      {
        rel: 'preconnect',
        href: 'https://picsum.photos',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/transition.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/pwa,
    '@nuxtjs/pwa',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
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
        home: '/',
      },
    },
    cookie: false,
  },
  axios: {
    baseURL: 'https://wallpaper-apiv1.herokuapp.com/',
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: { loaderOptions: { registerStylesSSR: true } },
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
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: {
      ignoreOrder: true,
    },
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
  sitemap: {
    hostname: 'https://pictorial.netlify.app/',
    gzip: true,
    trailingSlash: true,
  },
  pwa: {
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://i.picsum.photos/.*',
          handler: 'cacheFirst',
          method: 'GET',
        },
        {
          urlPattern: 'https://i.picsum.photos/id/.*',
          handler: 'cacheFirst',
          method: 'GET',
        },
      ],
    },
    manifest: {
      name: 'Wallpaper Hub',
      lang: 'en',
      theme_color: '#fff',
    },
    meta: {
      lang: 'en',
      ogSiteName: 'Pictorial',
      ogTitle: 'Wallpaper Hub',
      author: 'Lakshya Singh',
    },
  },
  generate: {
    crawler: true,
    exclude: [/^\/$/],
    fallback: true,
  },
  robots: {
    UserAgent: '*',
    Allow: '*',
  },
  middleware: ['auth'],
  loading: { color: '#D81B60' },
}
