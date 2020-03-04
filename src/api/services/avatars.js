import api from '@/api/api';

export default {
  getAll() {
    return api.get(`avatar`).then(response => response.data);
  },
};