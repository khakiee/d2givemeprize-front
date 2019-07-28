<template>
  <div class="comment-box border">
    <a :href="getUserPageUrl(authorNo)" class="d-inline-block pl-5 pt-2 pr-4">
      <div class="profile">
        <img v-if="authorImg" class="profile-img" :src="getImgSrc(authorImg)" alt=""/>
        <img v-if="!authorImg" class="profile-img" src="../assets/NavBarIcon/logo.png" alt=""/>
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

    <div v-if="isRecommentsShown" class="bg-white p-3 border">
      <div class="bg-white mr-lg-5 ml-lg-5 p-3">
        <input class="input-group-text d-inline-block text-xl-left" type="text" v-model="comment"
               placeholder="Comment here...">
        <button class="btn bg-light ml-3 " v-on:click="onClickCommentBtn">comment</button>
      </div>
      <div v-if="recommentsList">
        <div v-for="reply in recommentsList" v-bind:key="reply.orderNo">
          <a :href="getUserPageUrl(reply.writerNo)" class="d-inline-block pl-5 pt-2 pr-4">
            <div class="profile">
              <img v-if="reply.writerRepImg" class="profile-img" :src="getImgSrc(reply.writerRepImg)" alt=""/>
              <img v-if="!reply.writerRepImg" class="profile-img" src="../assets/NavBarIcon/logo.png" alt=""/>
              <div class="profile-namecard">
                <div class="author">{{reply.writerName}}</div>
              </div>
            </div>
          </a>
          <div class="d-inline-block">
            {{reply.replyContent}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import env from '../../static/settings_local'

  export default {
    name: "CommentBox",
    props: {
      author: String,
      authorNo: Number,
      authorImg: String,
      content: String,
      postNo: Number,
      replyNo: Number
    },
    data() {
      return {
        recommentsList: [],
        isRecommentsShown: false,
        comment: ""
      }
    },
    methods: {
      toggleShowRecomments() {
        if (this.isRecommentsShown === false) {
          this.getRecomments()
        }
        this.isRecommentsShown = !this.isRecommentsShown
      },
      onClickCommentBtn() {
        const kk = this
        axios.post('/Timeline/reply/' + this.replyNo,
            [[], {postNo: this.postNo.toString(), replyContent: this.comment}])
            .then((res) => {
              if (res.status === 200) {
                window.alert('write comment success')
                kk.comment = ""
                this.getRecomments()
              } else {
                window.alert('write comment failed')
              }
            })
      },
      getImgSrc(src) {
        return env.awsS3BucketName + src
      },
      getRecomments() {
        axios.get('/Timeline/reply/' + this.replyNo)
            .then((res) => {
              this.recommentsList = res.data
            })
      },
      getUserPageUrl(authorNo) {
        return "/user/" + authorNo
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
    height: 3rem;
    border: 1px gray solid;
    border-radius: 50%;
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
