import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store/store'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = store.getters.getIsAuth
  if (isAuthenticated) return next()
  next('/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/',
      name: 'pheed',
      component: () => import('./views/Pheed.vue'),
      beforeEnter: requireAuth()
    },
    {
      path: '/user/*',
      name: 'MyPage',
      component: () => import('./views/MyPage.vue'),
      beforeEnter: requireAuth()
    }
  ]
})
