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
    id: 2,
    firstname: '',
    school: '',
    pagesRead: 1,
    booksRead: 1,
    reviewsWritten: 1,
    role: '', // student, teacher, admin
    roleId: 0,
    roleType: '',
    avatarId: 1,
    avatarIcon: 'karate',
    avatarColor: 'blue',
    class: {
      pagesRead: 0,
      booksRead: 0,
      reviewsWritten: 0,
      id: 0,
    },
  },
  token: false,
  navbarIcon: false,
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