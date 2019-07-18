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
      <div class="btn-group border-top" role="group">
        <button type="button" class="btn">like</button>
        <button type="button" class="btn">comment</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Card",
    props: {
      postId: Number,
      imgSrc: String,
      text: String,
      author: String,
    },
    computed: {
      getDetailUrl: function () {
        return '/post/' + this.postId
      },
      getImgUrl: function () {
        return process.env.VUE_APP_S3_BUCKET_NAME + this.imgSrc
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

  .card-author {
    float: left;
    vertical-align: center;
    margin-left: 10px;
    font-weight: bold;
  }
</style>
