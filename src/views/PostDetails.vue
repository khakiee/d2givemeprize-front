<template>
  <div>
    <div class="card mr-lg-5 ml-lg-5 mt-lg-5">
      <div class="header border-bottom mb-2">
        <img class="card-author-profile" src="../assets/logo.png" alt="">
        <div class="card-author">{{this.author}}</div>
        <div class="card-subtitle">{{this.postRegDate}}</div>
      </div>
      <div class="card-body">
        <img v-if="postImgSrc" class="card-img border-bottom" :src="getImgUrl" alt=""/>
        <div class="card-mid bg-white">
          <img v-if="!likedByAuth" class="not-like-btn m-2"
               src="../assets/like_btn_img/not_like.png"
               v-on:click="onClickLikeBtn"
               alt=""/>
          <img v-if="likedByAuth" class="like-btn m-2"
               src="../assets/like_btn_img/like.png"
               v-on:click="onClickLikeBtn"
               alt=""/>
          <div class="d-inline-block float-right">
            조회수 : {{this.postHit}}
          </div>
        </div>
        <div class="card-text p-4 comment-box">
          <div class="card-text">{{this.postContent}}</div>
        </div>
      </div>
    </div>
    <div class="bg-white mr-lg-5 ml-lg-5 p-3 border">
      <input class="input-group-text d-inline-block text-xl-left" type="text" name="id" v-model="comment" placeholder="Comment here...">

      <button class="btn bg-light ml-3" v-on:click="onClickCommentBtn">comment</button>
    </div>
    <div class="card mr-lg-5 ml-lg-5">
      comments
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "PostDetails",
    data() {
      return {
        postInfo: {},
        postId: Number,
        likeCount: Number,
        likedByAuth: Boolean,
        postContent: String,
        postHit: Number,
        postImgSrc: "",
        postRegDate: String,
        author: String,
        comment: ""
      }
    },
    methods: {
      async getPostDetails() {
        this.postId = this.$route.params.postId
        this.$http.post('/Timeline/post/detailPheed', {
          postNo: this.postId
        }).then((res) => {
//          this.postInfo = res.data

          this.likeCount = res.data.liked
          this.likedByAuth = res.data.likedByAuth
          this.postContent = res.data.postContent
          this.postHit = res.data.postHit
          this.postImgSrc = res.data.postImg
          this.postRegDate = res.data.postRegDate
          this.author = res.data.userName
        }).catch((err) => {
          err.print()
        })
      },
      onClickLikeBtn: function () {
        const kk = this
        axios.post('/Timeline/post/likePheed',
            {postNo: this.postId})
            .then(function (res) {
              if (res.statusCode === 200) {
                kk.likedByAuth = !kk.likedByAuth
              }
            })
      },
      onClickCommentBtn: function () {
        const kk = this
        axios.post('/Timeline/reply/writeReply',
            [[], {postNo: this.postId, replyContent: this.comment}])
            .then(function (res) {
              if (res) {
                window.alert('write comment success')
                kk.comment = ""
              }
            })
      }
    },
    computed: {
      getImgUrl: function () {
        return process.env.VUE_APP_S3_BUCKET_NAME + this.postImgSrc
      }
    },
    mounted() {
      this.getPostDetails()
    }
  }
</script>

<style scoped>
  .comment-box {
    text-align: left;
  }

  .input-group-text {
    width: 50%;
  }

  .card-mid {
    padding: 2rem;
  }

  .card-text {
    text-align: left;
  }

  p.card-text {
    width: 250px;
    display: inline-block;
    border: 1px solid #111;
    word-wrap: break-word;
  }

  .btn-group {
    width: 100%;
  }

  .btn {
    border-radius: 0;
    background-color: white;
  }

  .header {
    padding: 10px;
  }

  .card-body {
    padding: 0;
  }

  .card-author-profile {
    width: 20px;
    height: auto;
    float: left;
    vertical-align: center;
  }

  .not-like-btn, .like-btn {
    width: 40px;
    height: 40px;
  }

  .card-author {
    float: left;
    vertical-align: center;
    margin-left: 10px;
    font-weight: bold;
  }
</style>
