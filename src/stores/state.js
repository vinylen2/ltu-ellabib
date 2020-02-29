export const state = {
  snackbar: {
    status: false,
    value: 'Felmeddelandetext',
    color: 'green lighten-2',
    timeout: 5000,
    hasLink: false,
    linkUrl: '',
  },
  user: {
    id: 1,
    firstname: '',
    school: '',
    pagesRead: 1,
    booksRead: 1,
    reviewsWritten: 1,
    role: '', // student, teacher, admin
    roleId: 0,
    roleType: '',
    avatarImageUrl: '',
    class: {
      pagesRead: 1,
      booksRead: 1,
      reviewsWritten: 1,
      id: 1,
    },
  },
  token: true,
  skolon: false,
  adminLoginModal: false,
  isLoading: false,
  userAgent: {
    isMobile: null,
  },
  books: [],
  authors: Array[Object],
  genres: Array[Object],
  classes: [],
  schoolUnit: Array[Object],
  highestRatedBooks: [],
  recentlyReviewedBooks: [],
};