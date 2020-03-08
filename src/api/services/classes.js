import api from '@/api/api';

export default {
  getClasses(token) {
      return api.get(`classes`, token).then(response => response.data);
  },
  getClassById(id) {
      return api.get(`classes/${id}`).then(response => response.data);
  },
};
