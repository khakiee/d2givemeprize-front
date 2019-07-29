import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from '../static/settings_local'
import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = `${store.getters.getAccessToken}`
axios.defaults.baseURL = env.apiUrl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
