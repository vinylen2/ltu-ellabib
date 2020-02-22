import api from '@/api/api';

export default {
  getClasses() {
      return api.get(`classes`).then(response => response.data);
  },
 
};
