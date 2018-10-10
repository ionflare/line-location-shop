

require("dotenv").config(); //add for LINELOGIN

//const bodyParser = require('body-parser')
//const session = require('express-session')

// setBaseURL
var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  //var API_URL='http://localhost:3000' //blank: localhost:3000
  var API_URL= 'https://3c9df73438794ae49a6a317ae2eeb187.vfs.cloud9.ap-southeast-1.amazonaws.com'
  
}
else{
  var API_URL=process.env.HEROKU_URL
}

module.exports = {
   
  mode: 'universal',
  
  
  serverMiddleware:[
    /*
    bodyParser.json(),
    session({
      secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie            : {
        // maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
        maxAge : 1000 * 60 * 60, // 60min
    }
    }),
    '~/api'
    
   */
    //{ path: '/api', handler: '~/api/index.js' },
    //{ path: '/api2', handler: '~/api2/index.js' }
      '~/api'
  ],
  
  head: {
  title: 'Line Loaction',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'line booking app using nuxt' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:  'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
    ]
  },
  
  
  
  
  
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    //'@nuxtjs/vuetify',
    //'@nuxtjs/font-awesome'
  ],
  
     css: [
    'vuetify/src/stylus/main.styl'
  ],

  
  
  plugins: [],
  css:[
    ],
  loading: { color: '#FFFFFF' },
  
  
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/vuetify',
   
  ],
  
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://3c9df73438794ae49a6a317ae2eeb187.vfs.cloud9.ap-southeast-1.amazonaws.com'
  },
  
   vuetify:{
    theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
    }    
  },
  
  
  
  
  
   build: {
  vendor:['axios', 'vuetify'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      /*
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      */
      
    }
  }
 
}

