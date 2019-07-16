<template>
  <div>
    <div class="pf-box">
      <img class="pf-img d-inline-block p-5" src="../assets/logo.png" alt="">
      <div class="pf-info-box d-inline-block align-center">
        <div class="pf-id-box">
          <div class="font-weight-bold d-inline-block m-3">
            {{this.userId}}
          </div>
          <button v-if="userId === UID" class="btn btn-primary d-inline-block m-3 align-top">Follow</button>
        </div>
        <div class="pf-cnt-box">
          <div class="d-inline-block p-2">
            게시물 {{this.posts}}
          </div>
          <div class="d-inline-block p-2">
            팔로잉 {{this.following}}
          </div>
          <div class="d-inline-block p-2">
            팔로워 {{this.follower}}
          </div>
        </div>
      </div>
    </div>
    <div class="post-cells">
      <ul class="nav nav-tabs d-inline-block">
        <li class="nav-item d-inline-block">
          <a class="nav-link active" data-toggle="tab" href="#post">게시물</a>
        </li>
        <li class="nav-item d-inline-block">
          <a class="nav-link" data-toggle="tab" href="#tagged">태그</a>
        </li>
      </ul>
      <div class="tab-content bg-white p-3">
        <div class="tab-pane fade show active" id="post">
          <div class="d-inline-block" v-for="post in userPosts" v-bind:key="post.postid">
            <img class="shadow img-thumbnail" :src="post.imgsrc" alt="">
          </div>
        </div>
        <div class="tab-pane fade" id="tagged">
          <p>Nunc vitae turpis</p>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import store from '../store/store'

  export default {
    name: "MyPage.vue",
    props: {
      userName: String,
      userId: String,
      userProfileImg: String,
      tagged: Number,
      follower: Number,
      following: Number,
      posts: Number,
      userPosts: [],
      data() {
        return {
          Uid: store.getters.getUid(),
        }
      }
    },
    computed: {
      getPostUrl: function (postid) {
        return '/posts/' + postid
      }
    },
    mounted() {
      this.userName = '김지환'
      this.userId = 'jh@test.com'
      this.tagged = 999
      this.follower = 999
      this.following = 999
      this.posts = 999

      this.userPosts = [
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 1,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 2,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 3,
        }, {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 1,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 2,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 3,
        }, {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 1,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 2,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 3,
        }, {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 1,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 2,
        },
        {
          imgsrc: 'https://scontent-icn1-1.cdninstagram.com/vp/d82afca2c6312b9b964911ea5bdcb7a1' +
              '/5DB8244B/t51.2885-19/s320x320/29400751_1866960876708737_1195845111410327552_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
          postid: 3,
        }
      ]
    }

  }
</script>

<style scoped>
  .post-cells {
    text-align: center;
  }

  .btn-primary {
    width: 6rem;
  }

  .nav-tabs {
    text-align: center;
  }

  .pf-box {
    text-align: center;
    vertical-align: center;
  }

  .font-weight-bold {
    font-size: 2rem;
  }

  .img-thumbnail {
    width: 15rem;
    margin: 0.5rem;
  }
</style>
