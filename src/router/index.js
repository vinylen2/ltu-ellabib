import Vue from 'vue';
import Router from 'vue-router';
import Books from '@/components/Books/Books';
import Frontpage from '@/components/Frontpage';
import BookDescription from '@/components/Books/BookDescription';
import ActivateReviews from '@/components/Review/ActivateReviews';
import PostBook from '@/components/Admin/PostBook';
import About from '@/components/About';
import Login from '@/components/User/Login';
import Profile from '@/components/User/Profile';
import Admin from '@/components/Admin/Admin';
import AuthSkolon from '@/components/Skolon/AuthSkolon';
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
      path: '/auth/skolon',
      name: 'auth-skolon',
      component: AuthSkolon,
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
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Store.state.token) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
  next();
});

export default router;
