<template>
  <div class="post-details text-center d-inline-block">
    <div class="card">
      <div class="header border-bottom mb-2">
        <img class="card-author-profile" src="../assets/NavBarIcon/logo.png" alt="">
        <div class="card-author">{{author}}</div>
        <div class="card-subtitle float-right">{{postRegDate}}</div>
      </div>
      <div class="card-body">
        <div v-if="postImgSrc" id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" :src="getImgUrl" alt="First slide">
            </div>
          </div>
          <a v-if="postImgCount > 1" class="shadow carousel-control-prev" v-on:click="onClickPreviousImgBtn"
             role="button"
             data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a v-if="postImgCount > 1" class="shadow carousel-control-next" v-on:click="onClickNextImgBtn" role="button"
             data-slide="next">
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
      </div>
    </div>
    <div class="bg-white p-3 border">
      <TagInput style="width: 80%"
                class="d-inline-block"
                @selectedTags="selectedTags"
                @input="getInput"/>
      <button class="btn bg-light ml-3 d-inline-block" v-on:click="onClickCommentBtn">comment</button>
    </div>
    <div class="card pb-4">
      <Comment v-for="item in commentList" :key="item.replyNo"
               :author="item.writerName"
               :author-no="item.writerNo"
               :content="item.replyContent"
               :reply-no="item.replyNo"
               :author-img="item.writerRepImg"
               :post-no="parseInt(postNo)"
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Comment from "../components/Comment";
  import env from '../../static/settings_local'
  import TagInput from "../components/TagInput";

  export default {
    name: "PostDetails",
    components: {
      TagInput,
      Comment
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
        isImgListLoaded: false,
        postImgCount: null
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
              this.postImgCount = post.postImgCount

              if (this.postImgSrc) {
                this.imgSrcList.push(this.postImgSrc)
                this.currentImgIndex = 0
              }
            }).catch((err) => {
          err.print()
        })
      },
      onClickLikeBtn() {
        axios.put('/Timeline/post/' + this.postNo,
            {postNo: this.postNo})
            .then((res) => {
              if (res.status === 200) {
                this.likedByAuth = !this.likedByAuth
                this.getPostDetails()
              }
            })
      },
      onClickCommentBtn() {
        const kk = this
        axios.post('/Timeline/reply',
            [this.tagList, {postNo: this.postNo, replyContent: this.comment}])
            .then((res) => {
              if (res.status === 200) {
                window.alert('write comment success')
                kk.comment = ""
                this.getPostDetails()
              } else {
                window.alert('write comment failed')
              }
            })
      },
      selectedTags(list) {
        this.tagList = list
      },
      getInput(val) {
        this.comment = val
      },
      onClickImgBtn() {
        axios.get('Timeline/post/' + this.postNo + '/loadPheedImg')
            .then((res) => {
              this.imgSrcList = res.data
              this.isImgListLoaded = true
            })
      },
      onClickNextImgBtn() {
        if (!this.isImgListLoaded) {
          this.onClickImgBtn()
          this.currentImgIndex += 1
        }
        this.currentImgIndex += 1
        if (this.currentImgIndex > this.imgSrcList.length - 1) {
          this.currentImgIndex -= this.imgSrcList.length
        }
      },
      onClickPreviousImgBtn() {
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
      getImgUrl: () => {
        return env.awsS3BucketName + this.imgSrcList[this.currentImgIndex]
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

  .post-details {
    padding-top: 20px;
    width: 60%;
    height: 90%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
