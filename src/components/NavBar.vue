<template>
  <nav class="navbar border-bottom">
    <div class="d-inline-block">
      <a href="/">
        <img src="../assets/NavBarIcon/logo.png" alt="../assets/NavBarIcon/logo.png" class="logo nav-item"/>
      </a>
    </div>
    <div v-if="getAuthState" class="d-inline-block search-box">
      <input v-model="query" v-on:keyup="getUserList" class="input-group-text"/>
      <div v-if="query" class="autocomplete">
        <div v-for="item in searchList" v-bind:key="item.userNo">
          <profile-card class="border p-3"
                        :user-no="item.userNo"
                        :user-id="item.userId"
                        :user-img="item.userRepImg"
                        :user-name="item.userName"
          />
        </div>
      </div>
    </div>
    <div v-if="getAuthState" class="d-inline-block">
      <div class="d-inline-block position-relative">
        <img v-if="isNewNoti" src="../assets/NavBarIcon/notification/on.png" alt="" class="nav-item"
             v-on:click="toggleNotifi"/>
        <img v-if="!isNewNoti" src="../assets/NavBarIcon/notification/off.png" alt="" class="nav-item"
             v-on:click="toggleNotifi"/>

        <div v-if="showNotifi" class="wrapper notibox border flex-fill shadow">
          <div v-for="item in getAlarmList" class="border" v-bind:key="item.alarmPheedNo">
            <div class="noti-item-box align-text-top" :class="[!item.checked ? notCheckedNotiClass : '']"
                 v-on:click="onClickNoti(item)">
              <img v-if="!item.postRepImg" src="../assets/logo.png" class="noti-img border d-inline-block">
              <img v-if="item.postRepImg" :src="getImgSrc(item.postRepImg)" class="noti-img border d-inline-block">
              <div class="noti-text d-inline-block pt-3 pl-2">
                {{getNotiString(item)}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <img src="../assets/NavBarIcon/RecommendFriends.png" alt="" class="nav-item"/>

      <div class="d-inline-block dropdown nav-item">
        <img src="../assets/NavBarIcon/RecommendFriends.png" id="dropdownMenuButton" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false" alt="" class="nav-item dropdown-toggle" style="margin: 0"/>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" :href="getUserPage">My Page</a>
          <a class="dropdown-item" v-on:click="submitSignOut">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
  import store from '../store/store'
  import axios from 'axios'
  import ProfileCard from "./ProfileCard";
  import env from '../../static/settings_local'
  import {mapActions} from 'vuex'

  export default {
    name: "navigation",
    components: {ProfileCard},
    data() {
      return {
        selectedUser: null,
        searchList: [],
        notificationList: [],
        query: "",
        showNotifi: false,
        newNotifi: Boolean,
        newNotifiCount: null,
        notCheckedNotiClass: 'not-checked'
      }
    },
    methods: {
      ...mapActions(['logout']),
      submitSignOut() {
        this.logout()
        this.$router.push('/login')
      },
      getUserList() {
        axios.post('/Timeline/tag/searchUsers'
            , this.query)
            .then((res) => {
              this.searchList = res.data
            })
      },
      toggleNotifi() {
        this.showNotifi = !this.showNotifi
      },
      getImgSrc: function (src) {
        return env.awsS3BucketName + src
      },
      getPostUrl: function (postNo) {
        return '/post/' + postNo
      },
      getNotiString: function (alarm) {
        let str = ""
        str = str + alarm.userFromName + '님이 '
        if (!alarm.replyNo) {
          str = str + '게시글을 공유하셨습니다.'
        }
        if (alarm.replyNo) {
          str = str + '댓글에 회원님을 언급하셨습니다.'
        }
        return str
      },
      onClickNoti: function (alarm) {
        axios.put('/Timeline/tag/readAlarm', {alarmPheedNo: alarm.alarmPheedNo}).then(() => {
          alarm.checked = 1
          this.showNotifi = false
          window.location.href = '/post/' + alarm.postNo
        })
      },
      fetchNoti: function () {
        store.actions.getNewNoti()
      }
    },
    computed: {
      getUserPage: () => {
        const uid = store.getters.getUid
        return '/user/' + uid
      },
      getAuthState: () => {
        return store.getters.getIsAuth
      },
      getAlarmList: () => {
        return store.getters.getUserAlarm
      },
      isNewNoti: () => {
        let isNew = store.getters.getUserAlarm.filter(
            function (alarm) {
              return alarm.checked === 0
            })
        if (isNew.length > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .navbar {
    text-align: center;
    display: block;
    height: 80px;
    padding-top: 20px;
  }

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

  .notibox {
    margin-top: 10px;
    z-index: 99;
    position: absolute;
    right: -123px;
    background-color: white;
    width: 800%;
    max-height: 300px;
    overflow: hidden;
    overflow-y: scroll;
  }

  .search-box {
    width: 500px;
    margin-right: 100px;
    margin-left: 100px;
  }

  .input-group-text {
    width: 100%;
  }

  .noti-img {
    width: 60px;
    height: 60px;
    margin: 5px;
  }

  .noti-item-box {
    text-align: left;
    height: 70px;
  }

  .noti-text {
    width: 65%;
    text-align: left;
    margin-left: 30px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .not-checked {
    background-color: lightskyblue;
  }

</style>
