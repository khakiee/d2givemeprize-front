<template>
  <div>
    <div class="pf-box">
      <img class="pf-img d-inline-block p-5" src="../assets/logo.png" alt="">
      <div class="pf-info-box d-inline-block align-center">
        <div class="pf-id-box">
          <div class="font-weight-bold d-inline-block m-3">
            {{this.userId}}
          </div>
          <button v-if="userId === UID" class="btn btn-primary d-inline-block m-3 align-top">Follow</button>
        </div>
        <div class="pf-cnt-box">
          <div class="d-inline-block p-2">
            게시물 {{this.posts}}
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
          <div class="d-inline-block" v-for="post in userPosts" v-bind:key="post.postid">
            <img class="shadow img-thumbnail" :src="post.imgsrc" alt="">
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

  export default {
    name: "MyPage.vue",
    props: {
      userName: String,
      userId: String,
      userProfileImg: String,
      tagged: Number,
      follower: Number,
      following: Number,
      posts: Number,
      userPosts: [],
      data() {
        return {
          Uid: store.getters.getUid(),
        }
      }
    },
    methods: {
      async getUserInfo() {
        this.userId = this.$route.params.userNo
        this.$http.get('/Timeline/user/' + this.userId).then((res) => {
//          this.postInfo = res.data
          let post = res.data.post

          this.likeCount = post.liked
          this.likedByAuth = post.likedByAuth
          this.postContent = post.postContent
          this.postHit = post.postHit
          this.postImgSrc = post.postImg
          this.postRegDate = post.postRegDate
          this.author = post.userName

          this.commentList = res.data.replyList
        }).catch((err) => {
          err.print()
        })
      }
    },
    computed: {
      getPostUrl: function (postid) {
        return '/posts/' + postid
      }
    },
    mounted() {
     this.getUserInfo()
    }

  }
</script>

<style scoped>
  .post-cells {
    text-align: center;
  }

  .btn-primary {
    width: 6rem;
  }

  .nav-tabs {
    text-align: center;
  }

  .pf-box {
    text-align: center;
    vertical-align: center;
  }

  .font-weight-bold {
    font-size: 2rem;
  }

  .img-thumbnail {
    width: 15rem;
    margin: 0.5rem;
  }
</style>
