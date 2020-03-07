import api from '@/api/api';

export default {
  getSchoolUnit(token) {
    return api.get(`schoolunit`, token).then(response => response.data);
  },
};
