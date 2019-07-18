<template>
  <div class="login">
    <div>
      <div class="d-inline-block align-top">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="d-inline-block">
        <div class="login-box">
          <form class="form-group form-control-lg" @submit.prevent="onSubmit" style="padding-top: 20px">
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
          let loginResult = await this.login({uid: this.input.userId, password: this.input.userPwd})
          if (loginResult) {
            this.goToPages()
          } else {
            window.alert('login failed')
          }
        } catch (err) {
          console.error(err)
        }
      },
      goToPages() {
        this.$router.push({
          name: 'pheed'
        })
      }
    }
  }
</script>

<style>
  p {
    white-space: nowrap;
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
