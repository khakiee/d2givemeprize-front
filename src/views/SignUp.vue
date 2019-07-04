<template>
  <div class="d-inline-block">
    <div>
      <form class="form-group form-control-lg" @submit="submitLogin" style="padding-top: 20px">
        <input class="input-group-text" type="text" name="id" v-model="input.id" placeholder="ID"/>
        <p></p>
        <input class="input-group-text" type="text" name="password" v-model="input.password"
               placeholder="Password"/>
        <p></p>
        <input class="input-group-text" type="text" name="password" v-model="input.password"
               placeholder="re enter Password"/>
        <p></p>
        <button class="btn btn-primary">Sign up</button>
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

<style scoped>

</style>
