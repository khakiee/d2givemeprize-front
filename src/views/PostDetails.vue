<template>
  <div class="ml-lg-5 mr-lg-5">
    <div class="card mr-lg-5 ml-lg-5 mt-lg-5">
      <div class="header border-bottom mb-2">
        <img class="card-author-profile" src="../assets/NavBarIcon/logo.png" alt="">
        <div class="card-author">{{author}}</div>
        <div class="card-subtitle">{{postRegDate}}</div>
      </div>
      <div class="card-body">
        <div v-if="postImgSrc" id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" :src="getImgUrl" alt="First slide">
            </div>
          </div>
          <a class="carousel-control-prev" v-on:click="onClickPreviousImgBtn" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" v-on:click="onClickNextImgBtn" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div class="card-text p-4 comment-box">
          <div class="card-text">{{postContent}}</div>
        </div>
        <div class="card-mid bg-white" style="color: #FA3623;">
          <img v-if="!likedByAuth" class="not-like-btn m-2"
               src="../assets/like_btn_img/not_like.png"
               v-on:click="onClickLikeBtn"
               alt=""/>
          <img v-if="likedByAuth" class="like-btn m-2"
               src="../assets/like_btn_img/like.png"
               v-on:click="onClickLikeBtn"
               alt=""/>
          {{likeCount}}
        </div>

        <div class="d-inline-block float-right">
          조회수 : {{postHit}}
        </div>
      </div>
    </div>
    <div class="bg-white mr-lg-5 ml-lg-5 p-3 border">
      <TagInput @selectedTags="selectedTags"
                @input="getInput"/>

      <button class="btn bg-light ml-3" v-on:click="onClickCommentBtn">comment</button>
    </div>
    <div class="wrapper card mr-lg-5 ml-lg-5">
      <scroll-list :debounce="50"
                   :remain="10"
                   :enabled="true"
                   :keep="true">

        <CommentBox v-for="item in commentList" :key="item.replyNo"
                    :author="item.writerName"
                    :author-no="item.writerNo"
                    :content="item.replyContent"
                    :reply-no="item.replyNo"
                    :author-img="item.writerRepImg"
                    :post-no="postNo"
        />
      </scroll-list>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import scrollList from 'vue-scroll-list';
  import CommentBox from "../components/CommentBox";
  import env from '../../static/settings_local'
  import TagInput from "../components/TagInput";

  export default {
    name: "PostDetails",
    components: {
      TagInput,
      CommentBox,
      scrollList
    },
    data() {
      return {
        postInfo: {},
        postNo: null,
        likeCount: null,
        likedByAuth: null,
        postContent: "",
        postHit: null,
        postImgSrc: "",
        postRegDate: "",
        author: "",
        comment: "",
        commentList: [],
        tagList: [],
        imgSrcList: [],
        currentImgIndex: null,
        isImgListLoaded: false
      }
    },
    methods: {
      async getPostDetails() {
        this.postNo = this.$route.params.postNo
        this.$http.get('/Timeline/post/' + this.postNo)
            .then((res) => {
              let post = res.data.post
              this.commentList = res.data.replyList

              this.likeCount = post.liked
              this.likedByAuth = post.likedByAuth
              this.postContent = post.postContent
              this.postHit = post.postHit
              this.postImgSrc = post.postRepImg
              this.postRegDate = post.postRegDate
              this.author = post.userName

              if (this.postImgSrc) {
                this.imgSrcList.push(this.postImgSrc)
                this.currentImgIndex = 0
              }
            }).catch((err) => {
          err.print()
        })
      },
      onClickLikeBtn: function () {
        axios.put('/Timeline/post/' + this.postNo,
            {postNo: this.postNo})
            .then((res) => {
              if (res) {
                this.likedByAuth = !this.likedByAuth
                this.getPostDetails()
              }
            })
      },
      onClickCommentBtn: function () {
        const kk = this
        axios.post('/Timeline/reply',
            [this.tagList, {postNo: this.postNo, replyContent: this.comment}])
            .then((res) => {
              if (res) {
                window.alert('write comment success')
                kk.comment = ""
                this.getPostDetails()
              }
            })
      },
      selectedTags: function (list) {
        this.tagList = list
      },
      getInput: function (val) {
        this.comment = val
      },
      onClickImgBtn: function () {
        axios.get('Timeline/post/' + this.postNo + '/loadPheedImg')
            .then((res) => {
              this.imgSrcList = res.data
              this.isImgListLoaded = true
            })
      },
      onClickNextImgBtn: function () {
        if (!this.isImgListLoaded) {
          this.onClickImgBtn()
          this.currentImgIndex += 1
        }
        this.currentImgIndex += 1
        if (this.currentImgIndex > this.imgSrcList.length - 1) {
          this.currentImgIndex -= this.imgSrcList.length
        }
      },
      onClickPreviousImgBtn: function () {
        if (!this.isImgListLoaded) {
          this.onClickImgBtn()
          this.currentImgIndex += 1
        }
        this.currentImgIndex -= 1
        if (this.currentImgIndex < 0) {
          this.currentImgIndex += this.imgSrcList.length
        }
      }
    },
    computed: {
      getImgUrl: function () {
        return env.awsS3BucketName + this.imgSrcList[this.currentImgIndex]
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
