import _ from 'lodash';
import MobileDetect from 'mobile-detect';
/* eslint-disable no-console */

export const getters = {
  userId: (state) => {
    return state.user.id;
  },
  authConfig: (state) => {
    if (state.token) {
      return {
        headers: {
          Authorization: 'Bearer ' + state.token,
        },
      }
    } return null;
  },
  isMobile: () => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
      return true;
    } return false;
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
  userSchoolUnit: (state) => {
    return _.find(state.schoolUnit, {'id': state.user.schoolUnitId});
  },
  user: (state) => {
    return state.user;
  },
  genres: (state) => {
    return state.genres;
  },
  sortedClassesPages: (state) => {
    return _.orderBy(state.classes, ['pagesRead'], ['desc']);
  },
  sortedClassesBooks: (state) => {
    return _.orderBy(state.classes, ['booksRead'], ['desc']);
  },
  sortedClassesReviews: (state) => {
    return _.orderBy(state.classes, ['reviewsWritten'], ['desc']);
  },
};