import api from '@/api/api';

export default {
  getAll() {
    return api.get(`avatar`).then(response => response.data);
  },
  update(data) {
    return api.patch('avatar', data).then(response => response.data);
  },
};