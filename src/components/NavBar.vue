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
      <div class="d-inline-block position-relative">
        <img v-if="newNotifi" src="../assets/NavBarIcon/notification/on.png" alt="" class="nav-item" v-on:click="toggleNotifi"/>
        <img v-if="!newNotifi" src="../assets/NavBarIcon/notification/off.png" alt="" class="nav-item" v-on:click="toggleNotifi"/>

        <div v-if="showNotifi" class="wrapper notibox border flex-fill shadow">
          <div v-for="item in notificationList" class="border">
            <div class="noti-item-box align-text-top">
              <a v-on:click="onClickNoti(item)">
                <img v-if="!item.postRepImg" src="../assets/logo.png" class="noti-img border d-inline-block">
                <img v-if="item.postRepImg" :src="getImgSrc(item.postRepImg)" class="noti-img border d-inline-block">
                <div class="noti-text d-inline-block pt-3 pl-2">
                  {{getNotiString(item)}}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
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
  import env from '../../static/settings_local'

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
        notificationList: [],
        query: "",
        showNotifi: false,
        newNotifi: Boolean,
        newNotifiCount: null
      }
    },
    watch: {
      searchList: function () {
        this.newNotifi = true
      }
    },
    methods: {
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
      isNewNoti() {
        this.notificationList.forEach((val) => {
          this.newNotifiCount = 0
          if (!val.checked) {
            this.newNotifi = true
            return
          }
        })
        this.newNotifi = false
      },
      getNotifi() {
        console.log('get noti')
        axios.get('/Timeline/tag/checkAlarm')
            .then((res) => {
              this.notificationList = res.data
            })
        this.isNewNoti()
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
        axios.put('/Timeline/tag/readAlarm', {alarmPheedNo: alarm.alarmPheedNo}).then(()=>{
          this.$router.push('/post/'+alarm.postNo)
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
      this.getNotifi()
      setInterval(this.getNotifi, 3000);
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
  }

  .input-group-text {
    width: 100%;
  }

  .noti-img {
    width: 50px;
    height: 50px;
    margin: 5px;
  }

  .noti-item-box {
    text-align: left;
    height: 60px;
  }

  .noti-text {
    width: 65%;
    text-align: left;
    margin-left: 30px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
