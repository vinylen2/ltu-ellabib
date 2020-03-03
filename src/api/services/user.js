import api from '@/api/api';

export default {
/* eslint-disable no-console */
  getUser(id, token) {
    return api.get(`user/id/${id}`, {headers: { Authorization: 'Bearer ' + token}}).then(response => response.data);
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
  getUserFavourites(id) {
    return api.get(`user/favourites/${id}`).then(response => response.data);
  },
};