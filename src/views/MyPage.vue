<template>
  <div>
    <div class="pf-box">
      <img class="pf-img d-inline-block p-5" src="../assets/logo.png" alt="">
      <div class="pf-info-box d-inline-block align-center">
        <div class="pf-id-box">
          <div class="font-weight-bold d-inline-block text-lg-center">
            {{this.userId}}
            <div class="p-0 m-0 align-text-top font-weight-light">
              {{this.userName}}
            </div>
          </div>
          <button v-if="relation" v-on:click="onClickUnFollow" class="btn btn-primary d-inline-block m-3 align-top">
            Already
            Followed!
          </button>
          <button v-if="!relation && userNo !== Uid" v-on:click="onClickFollow"
                  class="btn btn-primary d-inline-block m-3 align-top">Follow
          </button>
        </div>
        <div class="pf-cnt-box mt-lg-3">
          <div class="d-inline-block p-2">
            게시물 {{this.postList.length}}
          </div>
          <div class="d-inline-block p-2">
            팔로잉 {{this.following}}
          </div>
          <div class="d-inline-block p-2">
            팔로워 {{this.follower}}
          </div>
        </div>
      </div>
    </div>
    <div class="post-cells">
      <ul class="nav nav-tabs d-inline-block">
        <li class="nav-item d-inline-block">
          <a class="nav-link active" data-toggle="tab" href="#post">게시물</a>
        </li>
        <li class="nav-item d-inline-block">
          <a class="nav-link" data-toggle="tab" href="#tagged">태그</a>
        </li>
      </ul>
      <div class="tab-content bg-white p-3">
        <div class="tab-pane fade show active" id="post">

          <div class="d-inline-block " v-for="post in postList" v-bind:key="post.postId">
            <img v-if="post.postImg" class="post-box shadow img-thumbnail" :src="getImgUrl(post.postImg)" alt="">
            <div v-if="!post.postImg" class="post-box shadow img-thumbnail text-overflow-ellipsis">
              {{post.postContent}}
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="tagged">
          <p>Nunc vitae turpis</p>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import store from '../store/store'
  import axios from 'axios'

  export default {
    name: "MyPage.vue",
    props: {},
    data() {
      return {
        Uid: Number,
        userId: String,
        userImg: String,
        userName: String,
        userNo: Number,
        postList: Array,
        following: Number,
        follower: Number,
        relation: {},
        profileId: Number
      }
    },
    methods: {
      async getUserInfo() {
        this.profileId = parseInt(this.$route.params.userNo)
        this.$http.get('/Timeline/user/' + this.profileId).then((res) => {
//          this.postInfo = res.data
          const selectedUser = res.data.selectedUser

          this.postList = res.data.postList
          this.relation = res.data.relation

          this.following = selectedUser.followings
          this.follower = selectedUser.followers
          this.userId = selectedUser.userId
          this.userImg = selectedUser.userImg
          this.userName = selectedUser.userName
          this.userNo = selectedUser.userNo

        }).catch((err) => {
          err.print()
        })
      },
      getImgUrl(imgsrc) {
        return process.env.VUE_APP_S3_BUCKET_NAME + imgsrc
      },
      onClickFollow() {
        //alter
        axios.get('/Timeline/user/' + this.userNo + '/follow\n')
      },
      onClickUnFollow() {
        //alter
        axios.get('/Timeline/user/' + this.userNo + '/unfollow\n')
      }
    },
    computed: {},
    mounted() {
      this.getUserInfo()
      this.Uid = store.getters.getUid
    }
  }
</script>

<style scoped>
  .text-overflow-ellipsis {
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal !important;
    display: block;
  }

  .post-box {
    height: 150px;
    width: 200px;
  }

  .post-cells {
    text-align: center;
  }

  .btn-primary {
    width: 6rem;
  }

  .nav-tabs {
    text-align: center;
  }

  .pf-img {
    width: 35%;
  }

  .pf-box {
    text-align: center;
    vertical-align: center;
  }

  .font-weight-bold {
    font-size: 2rem;
  }

  .img-thumbnail {
    margin: 0.5rem;
  }
</style>
