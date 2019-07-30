// src/vuex/actions.js
import { ACCESSTOKEN, IS_AUTH, UID, USERALARM } from './mutation_types'
import axios from 'axios'

const setUID = ({ commit }, data) => {
  commit(UID, data)
}
const setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data)
}
const setAccessToken = ({ commit }, data) => {
  commit(ACCESSTOKEN, data)
}
const setAlarmList = ({ commit }, data) => {
  commit(USERALARM, data)
}
const processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setIsAuth(store, false)
      setAccessToken(store, '')
      setUID(store, null)
      break
    default:
      setUID(store, loginResponse.data.userNo)
      setAccessToken(store, loginResponse.headers.authorization)
      setIsAuth(store, true)
      axios.defaults.headers.common['Authorization'] = `${store.getters.getAccessToken}`
  }
}

export default {
  async login (store, { uid, password }) {
    const loginResponse = await axios.post('/user/login', { userId: uid, userPwd: password })
    processResponse(store, loginResponse)
    const alarmList = await axios.get('/tag/checkAlarm')
    setAlarmList(store, alarmList.data)
    return loginResponse
  },
  async getNewNoti (store) {
    const alarmList = await axios.get('/tag/checkAlarm')
    setAlarmList(store, alarmList.data)
    return alarmList.status
  },
  logout (store) {
    setIsAuth(store, false)
    setAccessToken(store, '')
    setUID(store, -1)
    setAlarmList(store, [])
    window.localStorage.removeItem('d2sns')
    window.localStorage.clear()
  }
}
