import Vue from 'vue';
import Vuex from 'vuex';
// import _ from 'lodash';
// import createPersistedState from 'vuex-persistedstate';
// import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      status: false,
      value: 'Felmeddelandetext',
      color: 'success',
      timeout: 5000,
      hasLink: false,
      linkText: '',
      linkUrl: '',
    },
  },
  getters: {
    snackbar: state => state.snackbar,
  },
  mutations: {
    hideSnackbar: (state) => {
      state.snackbar.status = false;
    },
    showSnackbar: (state, data) => {
      state.snackbar = data;
    },
  },
});