<template>
    <div class="profile">
        <a :href="getUserPageUrl">
            <img v-if="userImg" class="profile-img d-inline-block" :src="getImgUrl" alt=""/>
            <img v-if="!userImg" class="profile-img d-inline-block" src="../assets/profile.png" alt=""/>
            <div class="profile-namecard d-inline-block">
                <div class="name overflow-hidden">{{this.userName}}</div>
                <div class="id">{{this.userId}}</div>
            </div>
        </a>
    </div>
</template>

<script>
  import env from '../../static/settings_local'

  export default {
    name: 'profileCard',
    props: {
      userName: String,
      userId: String,
      userImg: String,
      userNo: Number,
      CardOn: Boolean
    },
    computed: {
      getImgUrl () {
        return env.awsS3BucketName + this.userImg
      },
      getUserPageUrl () {
        return '/user/' + this.userNo
      }
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
    height: 3rem;
    display: inline-block;
    vertical-align: top;
    border: 1px gray solid;
    border-radius: 50%;
  }

  .name {
    font-weight: bold;
    text-overflow: ellipsis;
    width: 80px;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
  }

  .id {
    font-size: smaller;
    text-overflow: ellipsis;
    width: 80px;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    color: gray;
  }

</style>
