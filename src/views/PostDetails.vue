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
      <input class="input-group-text d-inline-block text-xl-left" type="text" name="id" v-model="comment"
             placeholder="Comment here...">

      <button class="btn bg-light ml-3" v-on:click="onClickCommentBtn">comment</button>
    </div>
    <div class="wrapper card mr-lg-5 ml-lg-5">
      <scroll-list :debounce="50"
                   :remain="10"
                   :enabled="true"
                   :keep="true">

        <CommentBox v-for="item in commentList" :key="item.replyNo"
                    :author="item.writerName"
                    :author-id="item.writerNo"
                    :content="item.replyContent"
        />
      </scroll-list>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import scrollList from 'vue-scroll-list';
  import CommentBox from "../components/CommentBox";

  export default {
    name: "PostDetails",
    components: {
      CommentBox,
      scrollList
    },
    data() {
      return {
        postInfo: {},
        postId: Number,
        likeCount: Number,
        likedByAuth: Number,
        postContent: String,
        postHit: Number,
        postImgSrc: "",
        postRegDate: String,
        author: String,
        comment: "",
        commentList: Array
      }
    },
    methods: {
      async getPostDetails() {
        this.postId = this.$route.params.postId
        this.$http.post('/Timeline/post/detailPheed', {
          postNo: this.postId
        }).then((res) => {
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
      },
      onClickLikeBtn: function () {
        let kk = this
        axios.post('/Timeline/post/likePheed',
            {postNo: this.postId})
            .then(function (res) {
              if (res) {
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
    created() {
      window.__createSize = 40;
      window.__stopLoadData = false;
      window.__showScrollEvent = false;
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

  .wrapper {
    height: 400px;
    padding: 0;
    border: 1px solid #eee;
    -webkit-overflow-scrolling: touch;
  }

  .item {
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }

  .item:last-child {
    border-bottom: 0;
  }

  .scroll-container {
    transform: translate3d(0, 0, 0);
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
