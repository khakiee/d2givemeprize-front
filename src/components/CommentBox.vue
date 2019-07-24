<template>
  <div class="comment-box border">
    <a :href="getUserPageUrl" class="d-inline-block pl-5 pt-2 pr-4">
      <div class="profile">
        <img class="profile-img" src="../assets/logo.png" alt=""/>
        <div class="profile-namecard">
          <div class="author">{{author}}</div>
        </div>
      </div>
    </a>
    <div class="d-inline-block">
      {{content}}
    </div>

    <div class="float-right d-inline-block mt-3 mr-3">
      <button class="btn bg-white text-black-50 border"
              v-on:click="toggleShowRecomments"
      >show replies
      </button>
    </div>
    <div class="d-inline-block float-right mt-3 mr-5 ml-5">
      reples : 3
    </div>
    <div v-if="isRecommentsShown" class="bg-white mr-lg-5 ml-lg-5 p-3 border">
      <div class="bg-white mr-lg-5 ml-lg-5 p-3 border">
        <input class="input-group-text d-inline-block text-xl-left" type="text" v-model="comment"
               placeholder="Comment here...">
        <button class="btn bg-light ml-3" v-on:click="onClickCommentBtn">comment</button>
      </div>
      <div v-for="ii in [1,2,3,4,5,6]">
        <a :href="getUserPageUrl" class="d-inline-block pl-5 pt-2 pr-4">
          <div class="profile">
            <img class="profile-img" src="../assets/logo.png" alt=""/>
            <div class="profile-namecard">
              <div class="author">{{author}}</div>
            </div>
          </div>
        </a>
        <div class="d-inline-block">
          recomments-{{ii}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "CommentBox",
    props: {
      author: String,
      authorId: Number,
      authorImg: String,
      content: String,
      postNo: Number,
      replyNo: Number
    },
    data() {
      return {
        recommentsList: [],
        isRecommentsShown: false
      }
    },
    methods: {
      toggleShowRecomments: function () {
        this.isRecommentsShown = !this.isRecommentsShown
      },
      onClickCommentBtn: function () {
        const kk = this
        axios.post('/Timeline/reply/rereply',
            [[], {postNo: this.postNo, replyNo: this.replyNo ,replyContent: this.comment}])
            .then((res) => {
              if (res) {
                window.alert('write comment success')
                kk.comment = ""
                this.getPostDetails()
              }
            })
      }
    },
    computed: {
      getUserPageUrl: function () {
        return "/user/" + this.authorId
      }
    }
  }
</script>

<style scoped>
  .profile {
    text-align: left;
    vertical-align: center;
    horiz-align: center;
    padding-bottom: 1rem;
  }

  .profile-namecard {
    display: inline-block;
    vertical-align: center;
    text-align: left;
    padding-left: 1rem;
    height: 100%;
  }

  .profile-img {
    width: 3rem;
    display: inline-block;
    vertical-align: top;
  }

  a {
    color: inherit;
    text-decoration: none; /* no underline */
  }

  .author {
    font-weight: bold;
    text-align: center;
    vertical-align: center;
  }

  .input-group-text {
    width: 80%;
  }

  .comment-box {
    width: 100%
  }
</style>
