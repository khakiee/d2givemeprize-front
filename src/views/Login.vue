<template>
  <div class="login">
    <div>
      <div class="d-inline-block align-top logo-box">
        <img class="login-logo" alt="Vue logo" src="../assets/NavBarIcon/logo.png">
      </div>
      <div class="d-inline-block">
        <div class="login-box">
          <form class="form-group form-control-lg pt-2" @submit.prevent="onSubmit">
            <input class="input-group-text" type="text" name="id" v-model="input.userId" placeholder="ID"/>
            <p></p>
            <input class="input-group-text" type="password" name="password" v-model="input.userPwd"
                   placeholder="Password"/>
            <p></p>
            <button class="btn btn-primary">Login</button>
          </form>
        </div>
        <div>
          <a href="/signup">
            <button class="btn btn-primary">Sign Up</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Router from 'vue-router';
  import Vue from 'vue'
  import store from '../store/store'
  import {mapActions} from 'vuex'

  Vue.use(Router);

  export default {

    name: 'login',
    data() {
      return {
        input: {
          userId: "",
          userPwd: ""
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      async onSubmit() {
        try {
          await this.login({uid: this.input.userId, password: this.input.userPwd})
          if (store.getters.getAccessToken) {
            this.$router.push({
              name: 'pheed'
            })
          } else {
            window.alert('login failed')
          }
        } catch (err) {
          window.alert('login failed')
        }
      }
    }
  }
</script>

<style>
  p {
    white-space: nowrap;
  }

  .logo-box {
    width: 30%;
    height: auto;
  }

  .login-logo {
    display: inline-block;
    width: 100%;
    height: auto;
  }

  .login {
    display: inline-block;
    text-align: center;
    margin-top: 30px;
  }

  .login-box {
    width: fit-content;
    height: 11rem;
  }

  .btn-primary {
    width: 12.2rem;
    height: auto;
  }
</style>
