import * as types from './mutation_types'

export default {
  [types.UID](state, uid) {
    state.uid = uid
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth
  },
  [types.ACCESSTOKEN](state, accessToken) {
    state.accessToken = accessToken
  },
  [types.USERALARM](state, userAlarm) {
    state.userAlarm = userAlarm
  }
}
