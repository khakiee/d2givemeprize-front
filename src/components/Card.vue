<template>
    <div class="card">
        <div class="header border-bottom">
            <a :href="getAuthorUrl">
                <img v-if="!authorRepImg" class="card-author-profile" src="../assets/logo.png" alt="">
                <img v-if="authorRepImg" class="card-author-profile" :src="getProfileImgUrl" alt="">
                <div class="card-author">{{author}}</div>
            </a>
        </div>
        <div class="card-body">
            <div v-if="imgSrc">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
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
            </div>
            <a :href="getDetailUrl">
                <div class="card-text p-4">
                    <div class="card-text">{{text}}</div>
                </div>
            </a>
            <div class="like-btn-group" role="group">
                <img v-if="!isLiked" class="not-like-btn mb-4 pt-0"
                     src="../assets/like_btn_img/not_like.png"
                     v-on:click="onClickLikeBtn"
                     alt=""/>
                <img v-if="isLiked" class="like-btn mb-4 pt-0"
                     src="../assets/like_btn_img/like.png"
                     v-on:click="onClickLikeBtn"
                     alt=""/>
                {{likeCount}}
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import env from '../../static/settings_local'

  export default {
    name: 'Card',
    props: {
      likedByAuthUser: Number,
      postNo: Number,
      imgSrc: String,
      text: String,
      author: String,
      authorNo: Number,
      likeNum: Number,
      postImgCount: Number,
      authorRepImg: String
    },
    data () {
      return {
        imgSrcList: [],
        currentImgIndex: null,
        isImgListLoaded: false,
        isLiked: false,
        likeCount: null
      }
    },
    methods: {
      onClickLikeBtn () {
        axios.put('/post/' + this.postNo)
          .then((res) => {
            if (res.status === 200) {
              if (!this.isLiked) {
                this.likeCount += 1
              } else {
                this.likeCount -= 1
              }
              this.isLiked = !this.isLiked
            }
          })
      },
      onClickImgBtn () {
        axios.get('/post/' + this.postNo + '/loadPheedImg')
          .then((res) => {
            this.imgSrcList = res.data
            this.isImgListLoaded = true
            this.currentImgIndex += 1
          })
      },
      onClickNextImgBtn () {
        if (!this.isImgListLoaded) {
          this.onClickImgBtn()
        }
        this.currentImgIndex += 1
        if (this.currentImgIndex > this.imgSrcList.length - 1) {
          this.currentImgIndex -= this.imgSrcList.length
        }
      },
      onClickPreviousImgBtn () {
        if (!this.isImgListLoaded) {
          this.onClickImgBtn()
        }
        this.currentImgIndex -= 1
        if (this.currentImgIndex < 0) {
          this.currentImgIndex += this.imgSrcList.length
        }
      }
    },
    computed: {
      getDetailUrl () {
        return '/post/' + this.postNo
      },
      getAuthorUrl () {
        return '/user/' + this.authorNo
      },
      getImgUrl () {
        return env.awsS3BucketName + this.imgSrcList[this.currentImgIndex]
      },
      getProfileImgUrl () {
        return env.awsS3BucketName + this.authorRepImg
      }
    },
    mounted () {
      this.imgSrcList.push(this.imgSrc)
      this.isLiked = this.likedByAuthUser
      this.likeCount = this.likeNum
      this.currentImgIndex = 0
    }
  }
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: inherit;
    text-decoration: none;
  }

  .card {
    margin-bottom: 50px;
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
    cursor: pointer;
  }

  .card-author {
    float: left;
    vertical-align: center;
    margin-left: 10px;
    font-weight: bold;
  }

  .like-btn-group {
    color: #FA3623;
  }
</style>
