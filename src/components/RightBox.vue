<template>
  <div class="r-box">
    <div>
      <div class="profile">
        <a :href="getMyPageUrl()">
          <img class="profile-img" src="../assets/logo.png" alt=""/>
          <div class="profile-namecard">
            <div class="name">{{userName}}</div>
            <div class="id">{{userId}}</div>
          </div>
        </a>
      </div>
    </div>
    <div>
      <div>
        add friends
      </div>
      <div class="btn-group " role="group">
        <button type="button" class="btn btn-secondary">ipsum</button>
        <button type="button" class="btn btn-secondary">lorem</button>
        <button type="button" class="btn btn-secondary">dolor</button>
      </div>
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
      return {}
    },
    methods: {
      getMyPageUrl: function () {
        return "/user/" + this.userId
      }
    },
    mounted() {
      this.userName = '김지환'
      this.userId = 'eric967712'
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

  .r-box {
    width: 300px;
    padding: 40px;
  }
</style>
