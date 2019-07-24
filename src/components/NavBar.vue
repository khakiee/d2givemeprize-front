<template>
  <div class="navbar border-bottom p-4" style="height: 80px;">
    <div style="padding-left: 5rem;">
      <a href="/">
        <img src="../assets/logo.png" alt="" class="nav-item"/>
      </a>
    </div>
    <div style="padding-right: 8rem;">
      <img src="../assets/NavBarIcon/RecommendFriends.png" alt="" class="nav-item"/>
      <img src="../assets/NavBarIcon/user.png" alt="" class="nav-item"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "NavBar",
    components: {

    },
    data() {
      return {
        query: "김지환",
        selectedUser: null
      }
    },
    methods: {
      getUserList() {
        console.log('work!')
        axios.post('/Timeline/tag/searchUsers', {value: this.query})
            .then((res) => {
              console.log(res)
            })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .nav-item {
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }

  .navbar {
    background-color: white;
  }

  .autocomplete {
    width: 20%;
    height: 50%;
    margin-bottom: 20px;
  }
</style>
