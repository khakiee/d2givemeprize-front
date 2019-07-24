<template>
  <div class="r-box">
    <div>
      <div class="profile">
        <a :href="getUserPageUrl()">
          <img class="profile-img" src="../assets/logo.png" alt=""/>
          <div class="profile-namecard">
            <div class="name">{{this.userName}}</div>
            <div class="id">{{this.userId}}</div>
          </div>
        </a>
      </div>
      <button class="btn write-post border bg-white" v-on:click="onClickWriteBox">
        게시글 작성하기
      </button>
      <modal :visible.sync="showWriteBox">
      </modal>
    </div>
  </div>
</template>

<script>
  import Modal from "./WritePostModal";
  import axios from 'axios'

  export default {
    name: "RightBox",
    components: {Modal},
    props: {
      userName: String,
      userNo: Number,
      userId: String,
      userProfileImg: String
    },
    data() {
      return {
        showWriteBox: false
      }
    },
    methods: {
      getUserPageUrl: function () {
        return "/user/" + this.userNo
      },
      onClickWriteBox: function () {
        this.showWriteBox = !this.showWriteBox
      },
      submitPheed: function () {
        axios.post('/Timeline/post', [this.imagePaths, {postContent: this.postText}]).then((res) => {
          if (res) {
            window.alert('포스팅이 업로드 되었습니다.')
            this.showWriteBox = false
          } else {
            window.alter('failed')
          }
        })
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .profile {
    text-align: left;
    vertical-align: center;
    horiz-align: center;
    padding-bottom: 1rem;
  }

  .text-box {
    text-align: left;
  }

  .profile-namecard {
    display: inline-block;
    vertical-align: center;
    text-align: left;
    padding-left: 1rem;
  }

  .profile-img {
    width: 3rem;
    display: inline-block;
    vertical-align: top;
  }

  .name {
    font-weight: bold;
  }

  .id {
    font-size: smaller;
    color: gray;
  }

  .write-post {
    border-radius: 0.5rem;
    width: 100%;
    height: 10%;
  }

  .r-box {
    width: 300px;
    padding: 40px;
  }
</style>
