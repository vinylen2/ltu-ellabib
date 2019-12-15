import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontpage from '../components/Frontpage';
import Books from '../components/Books';
import Profile from '../components/Profile';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'frontpage',
    component: Frontpage
  },
  {
    path: '/books',
    name: 'books',
    component: Books
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
