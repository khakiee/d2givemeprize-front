import * as types from './mutation_types'

export default {
  [types.UID](state, uid) {
    state.uid = uid
  },
  [types.LID](state, lid) {
    state.lid = lid
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH](state, isAuth) {
    state.isAuth = isAuth
  },
  [types.UNAME](state, uname) {
    state.uname = uname
  },
  [types.ACCESSTOKEN](state, accessToken) {
    state.accessToken = accessToken
  }
}
