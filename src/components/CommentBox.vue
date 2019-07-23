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
  </div>
</template>

<script>
  export default {
    name: "CommentBox",
    props: {
      author: String,
      authorId: Number,
      content: String,
    },
    computed: {
      getUserPageUrl: function () {
        return "/user/" + this.userId
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

  .comment-box {
    width: 100%
  }
</style>
