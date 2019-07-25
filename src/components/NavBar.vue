<template>
  <div class="navbar border-bottom position-relative p-4" style="height: 80px;">
    <div style="padding-left: 5rem;">
      <a href="/">
        <img src="../assets/NavBarIcon/logo.png" alt="" class="nav-item"/>
      </a>
    </div>
    <div class="search-box">
      <input v-model="query" v-on:keyup="getUserList" class="input-group-text"/>
      <div v-if="query" class="autocomplete">
        <div v-for="item in searchList">
          <profile-card class="border p-3"
                        :user-no="item.userNo"
                        :user-id="item.userId"
                        :user-img="item.userRepImg"
                        :user-name="item.userName"
          />
        </div>
      </div>
    </div>
    <div style="padding-right: 8rem;">
      <img src="../assets/NavBarIcon/RecommendFriends.png" alt="" class="nav-item"/>
      <a :href="getUserPage">
        <img src="../assets/NavBarIcon/user.png" alt="" class="nav-item"/>
      </a>
    </div>
  </div>
</template>


<script>
  import store from '../store/store'
  import axios from 'axios'
  import ProfileCard from "./ProfileCard";

  export default {
    name: "NavBar",
    components: {ProfileCard},
    props: {
      sessionAlarm: Object
    },
    data() {
      return {
        selectedUser: null,
        searchList: [],
        query: ""
      }
    },
    methods: {
      getUserList() {
        axios.post('/Timeline/tag/searchUsers'
            , this.query)
            .then((res) => {
              this.searchList = res.data
            })
      }
    },
    computed: {
      getUserPage: function () {
        const uid = store.getters.getUid
        return '/user/' + uid
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

  .autocomplete {
    margin-top: 10px;
    z-index: 99;
    position: absolute;
    background-color: white;
    width: 500px;
  }

  .search-box {
    width: 500px;
  }

  .input-group-text {
    width: 100%;
  }
</style>
