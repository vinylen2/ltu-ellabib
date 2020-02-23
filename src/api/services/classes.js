import api from '@/api/api';

export default {
  getClasses() {
      return api.get(`classes`).then(response => response.data);
  },
  getClassById(id) {
      return api.get(`classes/${id}`).then(response => response.data);
  },
};
