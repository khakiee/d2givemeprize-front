<template>
  <div class="card">
    <div class="header border-bottom">
      <img class="card-author-profile" src="../assets/logo.png" alt="">
      <div class="card-author">{{this.author}}</div>
    </div>
    <div class="card-body">
      <img v-if="imgSrc" class="card-img border-bottom" :src="getImgUrl" alt=""/>
      <a :href="getDetailUrl">
        <div class="card-text p-4">
          <div class="card-text">{{this.text}}</div>
        </div>
      </a>
      <div class="" role="group">
        <img v-if="!liked" class="not-like-btn mb-4 pt-0"
             src="../assets/like_btn_img/not_like.png"
             v-on:click="onClickLikeBtn"
             alt=""/>
        <img v-if="liked" class="like-btn mb-4 pt-0"
             src="../assets/like_btn_img/like.png"
             v-on:click="onClickLikeBtn"
             alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import env from '../../static/settings_local'

  export default {
    name: "Card",
    props: {
      liked: Number,
      postId: Number,
      imgSrc: String,
      text: String,
      author: String,
    },
    methods: {
      onClickLikeBtn: function () {
        const kk = this
        axios.put('/Timeline/post/' + this.postId)
            .then(function (res) {
              if (res) {
                kk.liked = !kk.liked
              }
            })
      }
    },
    computed: {
      getDetailUrl: function () {
        return '/post/' + this.postId
      },
      getImgUrl: function () {
        return env.awsS3BucketName + this.imgSrc
      }
    }
  }
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none; /* no underline */
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

  a:hover {
    color: inherit;
    text-decoration: none;
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
