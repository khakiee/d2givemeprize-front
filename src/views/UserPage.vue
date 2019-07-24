<template>
  <div>
    <div class="pf-box">
      <img v-if="userImg" class="pf-img d-inline-block p-5" :src="getImgUrl(this.userImg)" alt="../assets/logo.png">
      <img v-if="!userImg" class="pf-img d-inline-block p-5" src="../assets/logo.png" alt="">
      <div class="pf-info-box d-inline-block align-center">
        <div class="pf-id-box">
          <div class="font-weight-bold d-inline-block text-lg-center">
            {{this.userId}}
            <div class="p-0 m-0 align-text-top font-weight-light">
              {{this.userName}}
            </div>
          </div>
          <button v-if="relation" v-on:click="onClickUnFollow" class="btn btn-primary d-inline-block m-3 align-top">
            Alread
            Followed!
          </button>
          <button v-if="!relation && userNo !== Uid" v-on:click="onClickFollow"
                  class="btn btn-primary d-inline-block m-3 align-top">Follow
          </button>
          <button v-if="!relation && userNo === Uid" v-on:click="onClickEdit"
                  class="btn btn-primary d-inline-block m-3 align-top">회원 정보 수정
          </button>
        </div>
        <div class="pf-cnt-box mt-lg-3">
          <div class="d-inline-block p-2">
            게시물 {{this.postList.length}}
          </div>
          <a :href="getFollowersPageUrl">
            <div class="d-inline-block p-2">
              팔로잉 {{this.following}}
            </div>
            <div class="d-inline-block p-2">
              팔로워 {{this.follower}}
            </div>
          </a>
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

          <div class="d-inline-block " v-for="post in postList" v-bind:key="post.postRegDate">
            <a :href="getPostUrl(post.postNo)">
              <img v-if="post.postRepImg" class="post-box shadow img-thumbnail" :src="getImgUrl(post.postRepImg)"
                   alt="">
              <div v-if="!post.postRepImg" class="post-box shadow img-thumbnail text-overflow-ellipsis">
                {{post.postContent}}
              </div>
            </a>
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
  import env from '../../static/settings_local'

  export default {
    name: "UserPage.vue",
    props: {},
    data() {
      return {
        Uid: null,
        userId: "",
        userImg: "",
        userName: "",
        userNo: null,
        postList: [],
        following: null,
        follower: null,
        relation: {},
        profileId: null
      }
    },
    methods: {
      async getUserInfo() {
        this.profileId = parseInt(this.$route.params.userNo)
        this.$http.get('/Timeline/user/' + this.profileId)
            .then((res) => {
              if (res.status === 200 && res.data) {
                const selectedUser = res.data.selectedUser
                this.postList = res.data.postList
                this.relation = res.data.relation

                this.following = selectedUser.followings
                this.follower = selectedUser.followers
                this.userId = selectedUser.userId
                this.userImg = selectedUser.userRepImg
                this.userName = selectedUser.userName
                this.userNo = selectedUser.userNo
              } else {
                window.alert('User not found!')
                this.$router.push('/')
              }
            })
            .catch((error) => {
              window.alert('error' + error)
              this.$router.push('/')
            })
      },
      onClickFollow() {
        if (confirm("팔로우 하시겠습니까?")) {
          axios.get('/Timeline/user/' + this.userNo + '/follow')
          this.getUserInfo()
        }
      },
      onClickUnFollow() {
        if (confirm("팔로우를 취소하시겠습니까?")) {
          axios.get('/Timeline/user/' + this.userNo + '/unfollow')
          this.getUserInfo()
        }
      },
      onClickEdit() {
        this.$router.push('/edit')
      },
      getPostUrl(postId) {
        return '/post/' + postId
      },
      getImgUrl(imgsrc) {
        return env.awsS3BucketName + imgsrc
      },
    },
    computed: {
      getFollowersPageUrl: function () {
        return '/follows/' + this.userNo
      }
    },
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
