import axios from 'axios'

const submitLogin = (userId, userPwd) => {
  return axios.post('/user/login', {
        userId: userId,
        userPwd: userPwd
      }
  )
}
export default {
  submitLogin
}
