// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from '@/stores/store';
import vuetify from './plugins/vuetify';

import App from './App';
import router from './router';

Vue.config.productionTip = false;


/* eslint-disable no-new */

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
