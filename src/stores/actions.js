import User from '@/api/services/user';
import Classes from '@/api/services/classes';
import SchoolUnit from "@/api/services/schoolunit.js";
import Genres from "@/api/services/genres.js";

/* eslint-disable no-console */
export const actions = {
  getUser({commit, state}) {
    User.getUser(state.user.id, state.token)
      .then((result) => {
        commit('userData', result.data);
      });
  },
  getUserClass({commit, state}) {
    SchoolUnit.getClassById(state.user.id).then(result => {
      commit("userClass", result.data);
    });
  },
  getClasses({commit}) {
    Classes.getClasses().then(result => {
      commit("classes", result.data);
    });
  },
  getSchoolUnits({commit}) {
    SchoolUnit.getSchoolUnit().then(result => {
      commit("schoolUnit", result.data);
    });
  },
  getGenres({commit}) {
    Genres.getAll().then(result => {
      commit("genres", result.data);
    });
  }
};