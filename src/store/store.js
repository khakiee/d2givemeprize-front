import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const state = {
  uid: '',
  uname: '',
  lid: '',
  errorState: '',
  isAuth: false,
  accessToken: '',
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersist({
    namespace: 'd2sns',
    initialState: {},
    expires: 30 * 60 * 1000
  })]
})
