import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/Books/BookDescription';
import PublishReview from '@/components/Review/PublishReview';
import ActivateReviews from '@/components/Review/ActivateReviews';
import PostBook from '@/components/Admin/PostBook';
import About from '@/components/About';
import BarcodeScanner from '@/components/BarcodeScanner';
import Login from '@/components/Admin/Login';
import Profile from '@/components/User/Profile';
import Admin from '@/components/Admin/Admin';
import QrCodes from '@/components/Admin/QrCodes';
import Store from '@/stores/store';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'frontpage',
      component: Frontpage,
    },
    {
      path: '/profile',
      name: 'Profil',
      component: Profile,
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: BarcodeScanner,
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/book/:slug',
      name: 'bok',
      component: BookDescription,
      props: true,
    },
    {
      path: '/book/:slug/review',
      name: 'publish-review',
      component: PublishReview,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'activate-reviews',
          name: 'activate-reviews',
          component: ActivateReviews,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'post-book',
          name: 'post-book',
          component: PostBook,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'qr-codes',
          name: 'qr-codes',
          component: QrCodes,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Store.state.isAdmin) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

export default router;
