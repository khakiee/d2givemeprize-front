import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

const getdefaultState = () => {
  return {
    uid: '',
    isAuth: false,
    accessToken: '',
    userAlarm: []
  }
}

const state = getdefaultState()

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
