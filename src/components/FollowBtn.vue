<template>
  <div class="button-group">
    <button v-if="!isFollowed" type="button" v-on:click="onClickFollow"
            class="btn mb-2 d-inline-block bg-primary text-white follow">follow
    </button>
    <button v-if="isFollowed" type="button" v-on:click="onClickUnFollow"
            class="btn mb-2 d-inline-block text-black-50 bg-white border">Unfollow
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
          axios.get('/Timeline/user/' + this.userNo + '/follow').then((res) => {
            if (res.status === 200) {
              this.isFollowed = !this.isFollowed
            }
          })
        }
      },
      onClickUnFollow() {
        if (confirm("팔로우를 취소하시겠습니까?")) {
          axios.get('/Timeline/user/' + this.userNo + '/unfollow').then((res) => {
            if (res.status === 200) {
              this.isFollowed = !this.isFollowed
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .btn {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
</style>
