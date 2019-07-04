<template>
  <div class="login">
    <div>
      <div class="d-inline-block align-top">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="d-inline-block">
        <div class="login-box">
          <form class="form-group form-control-lg" @submit="submitLogin" style="padding-top: 20px">
            <input class="input-group-text" type="text" name="id" v-model="input.id" placeholder="ID"/>
            <p></p>
            <input class="input-group-text" type="text" name="password" v-model="input.password"
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

  Vue.use(Router);

  export default {

    name: 'login',
    data() {
      return {
        input: {
          id: "",
          password: ""
        }
      }
    },
    methods: {
      submitLogin: function (e) {
        e.preventDefault();
        this.$router.push('/feed')
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
