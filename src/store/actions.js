// src/vuex/actions.js
import {ACCESSTOKEN, ERROR_STATE, IS_AUTH, UID} from './mutation_types'
import api from '../api/session'
import axios from 'axios'

let setUID = ({commit}, data) => {
  commit(UID, data)
}

let setErrorState = ({commit}, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
  commit(IS_AUTH, data)
}
let setAccessToken = ({commit}, data) => {
  commit(ACCESSTOKEN, data)
}
let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong ID or Password')
      setIsAuth(store, false)
      break
    default:
      setUID(store, loginResponse.data.userNo)
      setAccessToken(store, loginResponse.headers.authorization)
      setIsAuth(store, true)
      axios.defaults.headers.common['Authorization'] = `${store.getters.getAccessToken}`
  }
}

export default {
  async login(store, {uid, password}) {
    let loginResponse = await api.login(uid, password)
    processResponse(store, loginResponse)
    return store.getters.getIsAuth  // 로그인 결과를 리턴한다
  }
}
