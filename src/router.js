import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store/store'
import SignUp from "./views/SignUp";
import Pheed from "./views/Pheed";
import UserPage from "./views/UserPage";
import PostDetails from "./views/PostDetails";
import UserEdit from "./views/UserEdit";
import UserFollows from "./views/UserFollows";

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = store.getters.getIsAuth
  if (isAuthenticated) return next()
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/',
      name: 'pheed',
      component: Pheed,
      beforeEnter: requireAuth()
    },
    {
      path: '/user/:userNo',
      name: 'UserPage',
      component: UserPage,
      beforeEnter: requireAuth()
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: PostDetails,
      beforeEnter: requireAuth()
    },
    {
      path: '/edit',
      name: 'UserEdit',
      component: UserEdit,
      beforeEnter: requireAuth()
    },
    {
      path: '/follows',
      name: 'UserFollows',
      component: UserFollows,
      beforeEnter: requireAuth()
    }
  ]
})
