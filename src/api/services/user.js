import api from '@/api/api';

export default {
  getUser(id) {
    return api.get(`user/id/${id}`).then(response => response.data);
  },
};