<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #FAFAFA;
    height: 100%;
  }

  html, body {
    height: 100%;
    overflow: scroll;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
<script>
  import NavBar from "./components/NavBar";

  export default {
    components: {NavBar}
  }
</script>
