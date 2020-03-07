import api from '@/api/api';

export default {
  addImage(imageUrl, bookId, token) {
    return api.post('books/image', { imageUrl, bookId }, token).then(response => response.data);
  },
  getAll() {
    return api.get('books/').then(response => response.data);
  },
  get(id) {
    return api.get(`books/id/${id}`).then(response => response.data);
  },
  isReviewed(slug, userId) {
    return api.get(`books/reviewed/${slug}/${userId}`).then(response => response.data);
  },
  getFromSlug(slug, userId) {
/* eslint-disable no-console */
    let query = userId ? `?userId=${userId}` : '';
    return api.get(`books/slug/${slug}${query}`).then(response => response.data);
  },
  getFromIsbn(isbn) {
    return api.get(`books/isbn/${isbn}`).then(response => response.data);
  },
  getRecentlyReviewed() {
    return api.get('books/recently').then(response => response.data);
  },
  getHighestRated() {
    return api.get('books/highest').then(response => response.data);
  },
  postBook(book, token) {
    return api.post('books/', book, token).then(response => response.data);
  },
  search(queries) {
    return api.get(`books/search?query=${queries}`).then(response => response.data);
  },
  searchFromGenre(genre, queries) {
    return api.get(`books/genre/${genre}/search?query=${queries}`).then(response => response.data);
  },
  count() {
    return api.get('books/count').then(response => response.data);
  },
  edit(data, token) {
    return api.patch('books/edit', data, token)
      .then(response => response.data);
  },
  addGenre(data, token) {
    return api.post('books/genre', data, token)
      .then(response => response.data);
  },
  editPages(data, token) {
    return api.patch('books/edit/pages', data, token)
      .then(response => response.data);

  },
};
