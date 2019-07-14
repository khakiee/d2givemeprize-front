<template>
  <div class="d-inline-block">
    <div>
      <form class="form-group form-control-lg" @submit="submitSignin" style="padding-top: 20px">
        <input class="input-group-text" v-on:keyup="checkIdDup" type="text" name="id" v-model="input.id"
               placeholder="ID"/>
        <div v-if="idDupCheck === true" class="text-success"> 사용 가능!</div>
        <div v-if="idDupCheck === false" class="text-danger"> 사용 불가능!</div>
        <p></p>
        <input class="input-group-text" type="password" name="password" v-model="input.password"
               placeholder="Password"/>
        <p></p>
        <input class="input-group-text" type="password" name="re-password" v-model="input.re_password"
               placeholder="re enter Password" v-on:keyup="checkPwMatch"/>

        <div v-if="pwMatchCheck === true" class="text-success"> 사용 가능!</div>
        <div v-if="pwMatchCheck === false" class="text-danger"> pw 불일치!</div>
        <p></p>
        <button :disabled="!idDupCheck || !pwMatchCheck" class="btn btn-primary">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Router from 'vue-router';
  import Vue from 'vue'

  Vue.use(Router);

  export default {

    name: 'signup',
    data() {
      return {
        input: {
          id: "",
          password: "",
          re_password: ""
        },
        idDupCheck: null,
        pwMatchCheck: null
      }
    },
    methods: {
      checkPwMatch: function (e) {
        e.preventDefault();
        if (this.input.password === this.input.re_password) {
          this.pwMatchCheck = true
        } else {
          this.pwMatchCheck = false
        }
      },
      checkIdDup: function (e) {
        e.preventDefault();
        this.idDupCheck = true
        /*this.axios.post('/', {
          jsonData: JSON.stringify({
            userId: this.input.userId
          })
        }).then(function (response) {
          if (response) {
            // on available
            this.idDupCheck = true
          } else {
            // on not available
            this.idDupCheck = false
          }
        }).catch(function () {
          this.idDupCheck = true
        });*/
      },
      submitSignin: function (e) {
        e.preventDefault();
        this.axios.post('/', {
          jsonData: JSON.stringify({
            userId: this.input.userId,
            userPwd: this.input.userPwd
          })
        }).then(function (response) {
          if (response) {
            this.$router.push('/feed')
          }
        }).catch(function () {
          window.alert('network error')
        });
      }
    }
  }
</script>

<style scoped>

</style>
