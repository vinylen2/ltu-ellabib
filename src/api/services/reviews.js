import api from '@/api/api';

export default {
  getAll(slug) {
    return api.get(`reviews/slug/${slug}`).then(response => response.data);
  },
  create(data, token) {
    return api.post('reviews/', data, token).then(response => response.data);
  },
  publishSimple(data, token) {
    return api.post('reviews/simple', data, token).then(response => response.data);
  },
  getInactive(token) {
    return api.get('reviews/inactive', token).then(response => response.data);
  },
  bulkActivate(data, token) {
    return api.patch('reviews/', data, token).then(response => response.data);
  },
  editReviewAudio(data, token) {
    return api.patch('reviews/audio/edit', data, token).then(response => response.data);
  },
  updateRating(data, token) {
    return api.patch('reviews/rating', data, token).then(response => response.data);
  },
  updateText(data, token) {
    return api.patch('reviews/text', data, token).then(response => response.data);
  },
  deleteReview(data, token) {
    return api.patch('reviews/delete', data, token).then(response => response.data);
  },
};
