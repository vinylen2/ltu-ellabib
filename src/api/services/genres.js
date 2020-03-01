import api from '@/api/api';

export default {
  getAll() {
    return api.get('genres/').then(response => response.data);
  },
};
