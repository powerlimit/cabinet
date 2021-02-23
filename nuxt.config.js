export default {
  env: {
    phone: process.env.PHONE,
    email: process.env.EMAIL,
    address: process.env.ADDRESS,
    SHORT_TITLE: process.env.SHORT_TITLE,
    FULL_TITLE: process.env.FULL_TITLE,
    CABINET_ID: process.env.CABINET_ID,
    API_URL: process.env.SCHEME + '://api.' + process.env.MAIN_DOMAIN + '/api/v3',
    SITE_URL: process.env.SCHEME + '://' + process.env.MAIN_DOMAIN,
    STATIC_URL: process.env.SCHEME + '://static.' + process.env.MAIN_DOMAIN,
    PARTNER_URL: process.env.SCHEME + '://partner.' + process.env.MAIN_DOMAIN,
    OLD_CABINET_URL: process.env.SCHEME + '://my.' + process.env.MAIN_DOMAIN,
    TERMINAL_API_KEY: process.env.TERMINAL_API_KEY,
    TERMINAL_API_LINK: process.env.TERMINAL_API_LINK,
    SCHEME: process.env.SCHEME,
    MAIN_DOMAIN: process.env.MAIN_DOMAIN,
  },

  css: [
    '@/assets/scss/styles.scss',
  ],

  plugins: [
    '~/plugins/global.js',
    '~/plugins/vuelidate.js',
    '~/plugins/axios.js',
    '~/plugins/i18n.js',
    '~/plugins/tel-input.js',
    {src: '~/plugins/datepicker.js', ssr: false},
    {src: '~/plugins/multiselect.js', ssr: false},
  ],

  components: true,
  head: {
    title: process.env.SHORT_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: process.env.CABINET_ID === 'meros' ? 'favicon.ico' : 'haicon.png'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap'
      },
    ]
  },
  buildModules: [
  ],

  modules: [
    'nuxt-client-init-module',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    [
      'vue-currency-filter/nuxt',
      {
        symbol: 'USD',
        thousandsSeparator: ',',
        fractionCount: 2,
        fractionSeparator: '.',
        symbolPosition: 'back',
        symbolSpacing: true
      },
    ],
    [
      'nuxt-i18n',
      {
        seo: true,
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.js' },
          { code: 'ru', iso: 'ru-RU', file: 'ru.js' }
        ],
        defaultLocale: 'ru',
        fallbackLocale: 'en',
        strategy: 'prefix_except_default',
        lazy: true,
        langDir: 'locale/'
      }
    ],
    [
      'bootstrap-vue/nuxt',
      {
        bootstrapCSS: false,
        bootstrapVueCSS: false
      }
    ]
  ],
  loadingIndicator: false,
  toast: {
    position: 'top-right',
    duration: 15000,
    keepOnHover: true,
    action : {
      text : 'Закрыть',
      onClick : (e, toastObject) => {
        toastObject.goAway(0);
      }
    },
  },

  axios: {
    baseURL: process.env.SCHEME + '://api.' + process.env.MAIN_DOMAIN + '/api/v3',
    proxyHeaders: false,
    credentials: false
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: '/'
    },
    watchLoggedIn: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        endpoints: {
          login: { url: 'security/login', method: 'post', propertyName: 'token' },
          user: { url: 'user/info', method: 'get', propertyName: 'user' },
          logout: false
        },
        tokenType: false,
      }
    }
  },
/*  sentry: {
    dsn: process.env.SENTRY_DSN || 'https://9b4806403813469bbe8b4524165d232b@sentry.merostm.com/7',
    config: {},
  },*/
  build: {
    extend(config, ctx) {
      config.module.rules.push(
        {
          test: /\.(pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      )
    }
  },
}
