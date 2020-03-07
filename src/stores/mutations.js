/* eslint-disable no-console */
import { removeElement, appendIcon } from '@/assets/functions';

export const mutations = {
  setNavbarIcon: (state) => {
    setTimeout(() => {
      appendIcon('icon-nav', state.user.avatarIcon, state.user.avatarColor);
      state.navbarIcon = true;
    }, 500);
  },
  updateNavbarIcon: (state, data) => {
    state.navbarIcon = false;
    state.user.avatarIcon = data.avatarIcon;
    state.user.avatarColor = data.avatarColor;
    removeElement('icon-icon-nav');
  },
  setUserClass: (state, data) => {
    state.user.class = data;
  },
  setSkolon: (state) => {
    state.skolon = true;
  },
  userLogout: (state) => {
    state.user = null;
    state.skolon = false;
    state.token = null;
  },
  userData: (state, data) => {
    state.user.pagesRead = data.pagesRead;
    state.user.booksRead = data.booksRead;
    state.user.points = data.points;
    state.user.reviewsWritten = data.reviewsWritten;
    state.user.class = data.class;
    state.user.schoolUnit = data.schoolUnit;
  },
  showAdminLoginModal: (state) => {
    state.adminLoginModal = true;
  },
  adminLogin: (state, data) => {
    state.user = data.user;
    state.token = { headers: { Authorization: 'Bearer ' + data.token }};
    state.adminLoginModal = false;
  },
  errorSnackbar: (state, errorText) => {
    state.snackbar = {
      status: true,
      value: errorText,
      color: 'red lighten-2',
      timeout: 5000,
      hasLink: false,
    };
  },
  userLogin: (state, data) => {
    state.user = data.user;
    state.token = { headers: { Authorization: 'Bearer ' + data.token }};
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
  classes: (state, data) => {
    state.classes = data;
  },
  schoolUnit: (state, data) => {
    state.schoolUnit = data;
  }
};