import api from '@/api/api';

export default {
  getSchoolUnit() {
    return api.get(`schoolunit`).then(response => response.data);
  },
};
