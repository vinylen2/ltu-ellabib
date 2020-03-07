import api from '@/api/api';

export default {
  getAll() {
    return api.get(`avatar`).then(response => response.data);
  },
  update(data, token) {
    return api.patch('avatar', data, token).then(response => response.data);
  },
};