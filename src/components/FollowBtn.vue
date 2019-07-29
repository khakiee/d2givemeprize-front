<template>
    <div class="button-group">
        <button v-if="!followState" type="button" v-on:click="onClickFollow"
                class="btn mb-2 d-inline-block bg-primary text-white follow">follow
        </button>
        <button v-if="followState" type="button" v-on:click="onClickUnFollow"
                class="btn mb-2 d-inline-block text-black-50 bg-white border">Unfollow
        </button>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'followBtn',
    props: {
      isFollowed: Boolean,
      userNo: Number
    },
    data () {
      return {
        followState: null
      }
    },
    methods: {
      onClickFollow () {
        if (confirm('팔로우 하시겠습니까?')) {
          axios.get('/user/' + this.userNo + '/follow').then((res) => {
            if (res.status === 200) {
              this.followState = !this.followState
            }
          })
        }
      },
      onClickUnFollow () {
        if (confirm('팔로우를 취소하시겠습니까?')) {
          axios.get('/user/' + this.userNo + '/unfollow').then((res) => {
            if (res.status === 200) {
              this.followState = !this.followState
            }
          })
        }
      }
    },
    mounted () {
      this.followState = this.isFollowed
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
