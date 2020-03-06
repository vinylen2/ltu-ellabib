/* eslint-disable no-console */
export const mutations = {
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
    state.user.reviewsWritten = data.reviewsWritten;
    state.user.class = data.class;
    state.user.schoolUnit = data.schoolUnit;
  },
  showAdminLoginModal: (state) => {
    state.adminLoginModal = true;
  },
  adminLogin: (state, data) => {
    state.user = data.user;
    state.token = data.token;
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