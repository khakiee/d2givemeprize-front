<template>
  <div>
    <button v-if="!isFollowed" type="button" v-on:click="onClickFollow"
            class="btn d-inline-block btn-primary">follow
    </button>
    <button v-if="isFollowed" type="button" v-on:click="onClickUnFollow"
            class="btn d-inline-block btn-primary text-black-50 bg-white border">Unfollow
    </button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "followBtn",
    props: {
      isFollowed: Boolean,
      userNo: Number
    },
    methods: {
      onClickFollow() {
        if (confirm("팔로우 하시겠습니까?")) {
          axios.get('/Timeline/user/' + this.userNo + '/follow')
          this.getFollowers()
        }
      },
      onClickUnFollow() {
        if (confirm("팔로우를 취소하시겠습니까?")) {
          axios.get('/Timeline/user/' + this.userNo + '/unfollow')
          this.getFollowings()
        }
      }
    }
  }
</script>

<style scoped>

</style>
