import User from '@/api/services/user';
import Auth from '@/api/services/auth';
import Classes from '@/api/services/classes';
import SchoolUnit from "@/api/services/schoolunit.js";
import Genres from "@/api/services/genres.js";
import router from '@/router/index.js';
import _ from 'lodash';

/* eslint-disable no-console */
export const actions = {
  getUser({commit, state}) {
    User.getUser(state.user.id, state.token)
      .then((result) => {
        commit('userData', result.data);
      });
  },
  getClasses({commit, state}) {
    Classes.getClasses(state.token).then(result => {
      commit("classes", result.data);
      commit("setUserClass", _.find(result.data, { id: state.user.id }));
    });
  },
  getSchoolUnits({commit, state}) {
    SchoolUnit.getSchoolUnit(state.token).then(result => {
      commit("schoolUnit", result.data);
    });
  },
  getGenres({commit}) {
    Genres.getAll().then(result => {
      commit("genres", result.data);
    });
  },
  checkToken({commit, state, dispatch}) {
    Auth.checkToken(state.token).then((result) => {
      if (!result) {
        commit('userLogout');
        router.push('/login');
        commit('errorSnackbar', 'Du har blivit utloggad.');
      } else {
        commit('setNavbarIcon');
        // dispatch('getClasses');
        dispatch('getUser');
        dispatch('authChecker');
      } 
    });
  },
  authChecker({commit, state, dispatch}) {
    setTimeout(() => {
      Auth.checkToken(state.token).then((result) => {
        if (!result) {
          commit('userLogout');
          router.push('/login');
          commit('errorSnackbar', 'Du har blivit utloggad.');
        } else {
          dispatch('authChecker');
        }
      });
    }, 1000 * 60 * 60);
  },
};