<template>
  <div class="r-box">
    <div>
      <div class="profile">
        <a :href="getMyPageUrl()">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "RightBox",
    props: {
      userName: String,
      userId: String,
      userProfileImg: String
    },
    data() {
      return {
        write_box: false
      }
    },
    methods: {
      getMyPageUrl: function () {
        return "/user/" + this.userId
      },
      onClickWriteBox: function () {
        this.write_box = !this.write_box
      }
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
