// src/vuex/actions.js
import {ACCESSTOKEN, IS_AUTH, UID, USERALARM} from './mutation_types'
import axios from 'axios'

let setUID = ({commit}, data) => {
  commit(UID, data)
}
let setIsAuth = ({commit}, data) => {
  commit(IS_AUTH, data)
}
let setAccessToken = ({commit}, data) => {
  commit(ACCESSTOKEN, data)
}
let setAlarmList = ({commit}, data) => {
  commit(USERALARM, data)
}
let processResponse = (store, loginResponse) => {
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
  async login(store, {uid, password}) {
    let loginResponse = await axios.post('/Timeline/user/login', {userId: uid, userPwd: password})
    processResponse(store, loginResponse)
    let alarmList = await axios.get('/Timeline/tag/checkAlarm')
    setAlarmList(store, alarmList.data)
    return loginResponse
  },
  async getNewNoti(store) {
    let alarmList = await axios.get('/Timeline/tag/checkAlarm')
    setAlarmList(store, alarmList.data)
    return alarmList.status
  },
  logout(store) {
    setIsAuth(store, false)
    setAccessToken(store, '')
    setUID(store, -1)
    setAlarmList(store, [])
    window.localStorage.removeItem('d2sns')
  }
}
