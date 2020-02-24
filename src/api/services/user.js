import api from '@/api/api';

export default {
  getUser(id) {
    return api.get(`user/id/${id}`).then(response => response.data);
  },
  updateAvatar(data) {
    return api.patch('user/avatar', data).then(response => response.data);
  },
  getRecentlyRead(id) {
    return api.get(`user/recently-read/${id}`).then(response => response.data);
  },
  getFavouriteGenre(id) {
    return api.get(`user/favourite-genre/${id}`).then(response => response.data);
  },
};