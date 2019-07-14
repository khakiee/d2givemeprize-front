import axios from 'axios'

const submitLogin = (userId, userPwd) => {
  return axios.post('/Timeline/user/login', {
        userId: userId,
        userPwd: userPwd
      }
  )
};

export default {
  async login(uid, password) {
    try {
      const getUserInfoPromise = await submitLogin(uid, password)
      if (getUserInfoPromise.data.length === 0) return 'noAuth' // 로그인 결과에 따른 분기 처리를 해준다
      return getUserInfoPromise
    } catch (err) {
      err.print()
    }
  }
}
