import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import qs from 'qs';
import moment from 'vue-moment';
import VuePageTransition from 'vue-page-transition';
import axios from 'axios'






Vue.config.productionTip = false;
Vue.prototype.$appName = 'PM5 WEB FRONT'


Vue.use(qs.stringify); // querystringify
Vue.use(moment);
Vue.use(VuePageTransition);
//Vue.use(vuescroll);

// NOTE initialize eventBus
export const bus = new Vue(); // added line

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')