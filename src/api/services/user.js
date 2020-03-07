import api from '@/api/api';

export default {
/* eslint-disable no-console */
  getUser(id, token) {
    return api.get(`user/id/${id}`, token).then(response => response.data);
  },
  getRecentlyRead(id, token) {
    return api.get(`user/recently-read/${id}`, token).then(response => response.data);
  },
  getFavouriteGenre(id, token) {
    return api.get(`user/favourite-genre/${id}`, token).then(response => response.data);
  },
  getUserFavourites(id, token) {
    return api.get(`user/favourites/${id}`, token).then(response => response.data);
  },
};