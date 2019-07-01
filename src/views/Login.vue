<template>
  <div class="home">
    <div>
      <div class="d-inline-block align-top">
        <img class="" alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="d-inline-block">
        <form class="form-group form-control-lg" @submit="formSubmit" style="padding-top: 20px">
          <input class="input-group-text" type="text" name="id" v-model="input.id" placeholder="ID"/>
          <p></p>
          <input class="input-group-text" type="text" name="password" v-model="input.password" placeholder="Password"/>
          <p></p>
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
      submitLogin: () => {

      }
    }
  }
</script>

<style>
  p {
    white-space: nowrap;
  }

  .home {
    display: inline-block;
    text-align: center;
  }
</style>
