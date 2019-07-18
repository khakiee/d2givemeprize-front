<template>
  <div>
    <div class="card m-lg-5">
      <div class="header border-bottom mb-2">
        <img class="card-author-profile" src="../assets/logo.png" alt="">
        <div class="card-author">{{this.author}}</div>
        <div class="card-subtitle">{{this.postRegDate}}</div>
      </div>
      <div class="card-body">
        <img v-if="postImgSrc" class="card-img border-bottom" :src="getImgUrl" alt=""/>
        <div class="card-mid bg-white">
          <button class="btn ui-icon-heart d-inline-block float-left">
            like btn
          </button>
          <div class="d-inline-block float-right">
            조회수 : {{this.postHit}}
          </div>
        </div>
        <div class="card-text p-4">
          <div class="card-text">{{this.postContent}}</div>
        </div>
      </div>
    </div>
    <div class="card m-lg-5">
      write comment
    </div>
    <div class="card m-lg-5">
      comments
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostDetails",
    data() {
      return {
        postInfo: {},
        postId: Number,
        likeCount: Number,
        postContent: String,
        postHit: Number,
        postImgSrc: String,
        postRegDate: String,
        author: String,
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
          this.postContent = res.data.postContent
          this.postHit = res.data.postHit
          this.postImgSrc = res.data.postImg
          this.postRegDate = res.data.postRegDate
          this.author = res.data.userName
        }).catch((err) => {
          err.print()
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
  .card-mid {
    padding: 2rem;
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
