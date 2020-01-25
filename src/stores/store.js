import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import createPersistedState from 'vuex-persistedstate';
import MobileDetect from 'mobile-detect';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "props": false }]*/
export default new Vuex.Store({
  state: {
    snackbar: {
      status: false,
      value: 'Felmeddelandetext',
      color: 'green lighten-2',
      timeout: 5000,
      hasLink: false,
      linkUrl: '',
    },
    isAdmin: false,
    isLoading: false,
    isAllowedIp: false,
    userAgent: {
      isMobile: null,
    },
    books: [],
    authors: Array[Object],
    genres: Array[Object],
    highestRatedBooks: [],
    recentlyReviewedBooks: [],
    qrArray: [],
    count: {},
    isMobile: null,
  },
  getters: {
    snackbar: state => state.snackbar,
    isAllowedToPublish: (state) => {
      if (state.isAdmin || state.isAllowedIp) {
        return true;
      }
      return false;
    },
    isDeviceWithMic: () => {
      navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
      if (navigator.getUserMedia) {
        return true;
      }
      return false;
    },
  },
  mutations: {
/* eslint-disable no-console */
    hideSnackbar: (state) => {
      state.snackbar.status = false;
    },
    showSnackbar: (state, data) => {
      state.snackbar = data;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },
    isNotLoading: (state) => {
      state.isLoading = false;
    },
    count: (state, data) => {
      state.count = data;
    },
    isMobile: (state) => {
      const md = new MobileDetect(window.navigator.userAgent);
      if (md.mobile()) {
        state.userAgent.isMobile = true;
        return;
      }
      state.userAgent.isMobile = false;
    },
    changeAdminState: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    isAllowedIp: (state) => {
      state.isAllowedIp = true;
    },
    books: (state, data) => {
      state.books = data;
    },
    genres: (state, data) => {
      state.genres = data;
    },
    addAuthor: (state, data) => {
      state.authors.push(data);
    },
    authors: (state, data) => {
      state.authors = data;
    },
    recentlyReviewedBooks: (state, data) => {
      state.recentlyReviewedBooks = data;
    },
    highestRatedBooks: (state, data) => {
      state.highestRatedBooks = data;
    },
    addQrArray: (state, data) => {
      state.qrArray = data;
    },
    toggleQr: (state, data) => {
      const index = _.findIndex(state.qrArray, { id: data.id });
      if (index === -1) {
        state.qrArray.push(data);
      } else {
        state.qrArray.splice(index, 1);
      }
    },
    resetQr: (state) => {
      state.qrArray = [];
    },
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
});
