import api from '@/api/api';

export default {
  loginSkolon(code) {
    return api.get(`auth/skolon/${code}`).then(response => response.data);
  },
  loginAdmin(credentials) {
    return api.post('auth/admin', credentials).then(response => response.data);
  },
};
