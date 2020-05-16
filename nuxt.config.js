require('dotenv').config()

export default {
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css'
      }
    ]
  },
  loading: { color: '#fff' },
  plugins: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT
        },
        services: {
          auth: {
            persistence: 'local',

            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction'
            },

            ssr: false
          },
          firestore: {
            static: false,
            preload: false,
            chunkName:
              process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]',
            enablePersistence: true
          }
        }
      }
    ]
  ],
  pwa: {
    icon: false,
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      dev: false
    }
  },
  axios: {},
  build: {
    extend(config, ctx) {}
  }
}
