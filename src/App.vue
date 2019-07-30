<template>
    <div id="app">
        <navigation id="nav-bar"/>
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
    margin: 0;
    padding: 0;
    height: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
<script>
  import navigation from './components/NavBar'
  import { mapActions } from 'vuex'

  export default {
    components: { navigation },
    data () {
      return {
        getAlarmTimer: null
      }
    },
    methods: {
      ...mapActions(['getNewNoti']),
      updateNotifi () {
        this.getNewNoti()
      }
    },
    mounted () {
      const self = this
      this.getAlarmTimer = setInterval(function () {
        self.getNewNoti()
      }, 5000)
    },
    destroyed () {
      clearInterval(this.getAlarmTimer)
    }
  }
</script>
