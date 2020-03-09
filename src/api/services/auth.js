import api from '@/api/api';

export default {
  loginSkolon(code) {
    return api.get(`auth/skolon/${code}`).then(response => response.data);
  },
  loginAdmin(credentials) {
    return api.post('auth/admin', credentials).then(response => response.data);
  },
  checkToken(token) {
    return api.get('auth/activity', token)
      .then(response => response.data)
      .catch((error) => {
        if (!error.status) {
          return false;
        }
      })
  },
};
