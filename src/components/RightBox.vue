<template>
  <div class="r-box">
    <div>
      <profileCard :user-name="userName"
                   :user-id="userId"
                   :user-no="userNo"
                   :user-img="userProfileImg"
      ></profileCard>
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
  import profileCard from "./ProfileCard"

  export default {
    name: "RightBox",
    components: {profileCard, Modal},
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
    }
  }
</script>

<style scoped>

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
