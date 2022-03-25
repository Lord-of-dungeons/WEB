import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import qs from 'qs';
import moment from 'vue-moment';
import VuePageTransition from 'vue-page-transition';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuthenticate from '@simbachain/vue-authenticate'


Vue.config.productionTip = false;
Vue.prototype.$appName = 'PM5 WEB FRONT'


Vue.use(qs.stringify); // querystringify
Vue.use(moment);
Vue.use(VuePageTransition);
//Vue.use(vuescroll);

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: process.env.VUE_APP_API_URL, // Your API domain

  providers: {
    github: {
      redirectUrl: 'com.lordofdungeons://',
      clientId: process.env.VUE_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.VUE_APP_GITHUB_CLIENT_SECRET,
      scopes: ['identity', 'user:email'],
      additionalHeaders: { Accept: 'application/json' },
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
      },
      facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v10.0/dialog/oauth',
        //redirectUri: getRedirectUri('/'),
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 },
      },

      google: {
        name: 'google',
        url: '/auth/google',
        clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        //redirectUri: getRedirectUri(),
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 },
      },

    }

  }
})

// NOTE initialize eventBus
export const bus = new Vue(); // added line

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')