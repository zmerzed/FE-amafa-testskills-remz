// https://v3.nuxtjs.org/api/configuration/nuxt.config
import vuetify from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  ssr: false,
  devtools: { 
    enabled: true 
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Loyali',
    }
  },
  routeRules: {
    '/terms-of-service': { ssr: false },
    '/privacy-policy': { ssr: false },
  },
  css: ['vuetify/lib/styles/main.sass', 'mdi/css/materialdesignicons.min.css', '~/assets/scss/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) {
          config.plugins.push(vuetify());
        }
      });
    },
    'nuxt-lodash',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  plugins: [{ src: '~/plugins/date-picker.ts', mode: 'client' }, '~/plugins/maska.ts'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      apiURL: process.env.API_URL,

      cookieName: process.env.APP_COOKIE || 'CMX_TOKEN',

      homeUrl: '/',
      loginUrl: '/login',
      // Redirect to the login page if the user is not authenticated.
      redirectUnauthenticated: false,
    },
  },
});