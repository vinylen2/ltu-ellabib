import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
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
    user: {
      id: 1,
      firstname: '',
      class: '',
      school: '',
      pagesRead: 0,
      booksRead: 0,
      reviewsWritten: 0,
      role: '', // student, teacher, admin
      roleId: 3,
      roleType: '',
    },
    token: true,
    skolon: false,
    adminLoginModal: false,
    isLoading: false,
    userAgent: {
      isMobile: null,
    },
    books: [],
    authors: Array[Object],
    genres: Array[Object],
    highestRatedBooks: [],
    recentlyReviewedBooks: [],
    count: {},
    isMobile: null,
  },
  getters: {
    authConfig: (state) => {
      if (state.token) {
        return {
          headers: {
            'Authorization': 'Bearer ' + state.token,
          },
        }
      } return null;
    },
    isLoggedIn: (state) => {
      if (state.token) {
        return true;
      }
      return false;
    },
    isAdmin: (state) => {
      if (state.user == null) {
        return false;
      }
      if (state.user.roleType == 'admin' || state.user.roleId == 3) {
        return true;
      }
      return false;
    },
    snackbar: state => state.snackbar,
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
    setSkolon: (state) => {
      state.skolon = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.skolon = false;
      state.token = null;
    },
    userData: (state, data) => {
      state.user = data;
    },
    showAdminLoginModal: (state) => {
      state.adminLoginModal = true;
    },
    adminLogin: (state, data) => {
      state.user = data.user;
      state.token = data.token;
      state.adminLoginModal = false;
    },
    userLogin: (state, data) => {
      state.user = data.user;
      state.token = data.token;
      state.skolon = true;
    },
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
  },
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage,
  // })],
});
