<template>
  <div>
    <div class="pf-box pb-lg-5">
      <img v-if="userImg" class="pf-img d-inline-block" :src="getImgUrl(this.userImg)" alt="../assets/logo.png">
      <img v-if="!userImg" class="pf-img d-inline-block" src="../assets/profile.png" alt="">
      <div class="pf-info-box d-inline-block align-center">
        <div class="pf-id-box">
          <div class="font-weight-bold d-inline-block text-lg-center">
            {{this.userId}}
            <div class="p-0 m-0 align-text-top font-weight-light">
              {{this.userName}}
            </div>
          </div>
        </div>
        <div class="pf-cnt-box mt-lg-3">
          <div class="d-inline-block p-2">
            게시물 {{this.postList.length}}
          </div>
          <div class="view-follower-btn d-inline-block p-2" style="cursor: pointer"
               v-on:click="toggleFollowersModal">
            팔로잉 {{this.following}}
          </div>
          <div class="view-follower-btn d-inline-block p-2" style="cursor: pointer"
               v-on:click="toggleFollowersModal">
            팔로워 {{this.follower}}
          </div>
        </div>
        <button v-if="relation" v-on:click="onClickUnFollow"
                class="btn bg-white border text-black-50 d-inline-block m-3 align-top">
          Unfollow
        </button>
        <button v-if="!relation && userNo !== Uid" v-on:click="onClickFollow"
                class="btn btn-primary d-inline-block m-3 align-top">Follow
        </button>
        <button v-if="!relation && userNo === Uid" v-on:click="onClickEdit"
                class="btn bg-white border text-black-50 d-inline-block m-3 align-top">정보 수정
        </button>
      </div>
    </div>
    <div class="post-cells">
      <ul class="nav nav-tabs d-inline-block">
        <li class="nav-item d-inline-block">
          <a class="nav-link active" data-toggle="tab" href="#post">게시물</a>
        </li>
        <li class="nav-item d-inline-block">
          <a class="nav-link" data-toggle="tab" href="#tagged">태그된 게시물</a>
        </li>
      </ul>
      <div class="tab-content bg-white p-3">
        <div class="tab-pane fade text-left show active" id="post">
          <div class="d-inline-block " v-for="post in postList" v-bind:key="post.postRegDate">
            <a :href="getPostUrl(post.postNo)">
              <img v-if="post.postRepImg" class="post-box shadow img-thumbnail" :src="getImgUrl(post.postRepImg)"
                   alt="">
              <img v-if="!post.postRepImg" class="post-box shadow img-thumbnail" src="../assets/logo.png">
            </a>
          </div>
        </div>
        <div class="tab-pane fade text-left" id="tagged">
          <div class="d-inline-block " v-for="post in taggedList" v-bind:key="post.postRegDate">
            <a :href="getPostUrl(post.postNo)">
              <img v-if="post.postRepImg" class="post-box shadow img-thumbnail" :src="getImgUrl(post.postRepImg)"
                   alt="">
              <img v-if="!post.postRepImg" class="post-box shadow img-thumbnail" src="../assets/logo.png">
            </a>
          </div>
        </div>
      </div>
    </div>
    <followers :visible.sync="showFollowersModal"/>
  </div>
</template>

<script>
  import store from '../store/store'
  import axios from 'axios'
  import env from '../../static/settings_local'
  import followers from '../components/FollowerModal'

  export default {
    name: "UserPage.vue",
    props: {},
    components: {
      followers
    },
    data() {
      return {
        Uid: null,
        userId: "",
        userImg: "",
        userName: "",
        userNo: null,
        postList: [],
        taggedList: [],
        following: null,
        follower: null,
        relation: {},
        profileId: null,
        showFollowersModal: false,
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
                this.taggedList = res.data.taggedPostList
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
      toggleFollowersModal() {
        this.showFollowersModal = !this.showFollowersModal
      }
    },
    mounted() {
      this.getUserInfo()
      this.Uid = store.getters.getUid
    }
  }
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #337BFF;
    text-decoration: none;
  }

  .post-box {
    height: 200px;
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
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 5px solid darkgray;
    vertical-align: top;
    margin-top: 20px;
  }

  .pf-box {
    text-align: center;
    vertical-align: center;
  }

  .pf-info-box {
    padding-top: 70px;
    padding-left: 30px
  }

  .font-weight-bold {
    font-size: 2rem;
  }

  .img-thumbnail {
    margin: 0.5rem;
  }

  div.view-follower-btn:hover {
    color: #337BFF;
    text-decoration: none;
  }
</style>
