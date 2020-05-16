import colors from "vuetify/es5/util/colors";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/firebase"],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /* Firebase設定 */
  firebase: {
    config: {
      apiKey: "AIzaSyCnwBF3rg5FzpbJH5fofkCsV_BEOGPz0u4",
      authDomain: "noraneko-guild.firebaseapp.com",
      databaseURL: "https://noraneko-guild.firebaseio.com",
      projectId: "noraneko-guild",
      storageBucket: "noraneko-guild.appspot.com",
      messagingSenderId: "557661961189",
      appId: "1:557661961189:web:1c3c0769c53934f4920d0c"
    },
    // customEnv: false,
    // onFirebaseHosting: false,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION"
          // onAuthStateChangedAction: 'onAuthStateChangedAction'
        }
      },
      firestore: true,
      functions: true
      // storage: false,
      // realtimeDb: false,
      // performance: false,
      // analytics: false,
      // remoteConfig: false,
      // messaging: false
    }
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? "server" : "client",
              corejs: { version: 3 }
            }
          ]
        ];
      }
    }
  }
};
