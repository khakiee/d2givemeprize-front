<template>
    <div class="pheed-page" v-on:scroll="onScroll" ref="pheed">
        <div class="float-left">
            <div class="wrapper">
                <div class="pheed">
                    <Card v-for="item in postList" :key="item.postRegDate"
                          :img-src="item.postRepImg"
                          :post-no="item.postNo"
                          :text="item.postContent"
                          :author="item.userName"
                          :author-no="item.userNo"
                          :liked-by-auth-user="item.likedByAuth"
                          :like-num="item.liked"
                          :post-img-count="item.postImgCount"
                          :author-rep-img="item.authorRepImg"
                    />
                </div>
            </div>
        </div>
        <div class="right-box">
            <RightBox :user-id="userId"
                      :user-no="userNo"
                      :user-name="userName"
                      :user-profile-img="userImg"

            ></RightBox>
            <Footer/>
        </div>
    </div>
</template>

<script>
  import Card from '../components/Card'
  import RightBox from '../components/RightBox'
  import Footer from '../components/Footer'
  import axios from 'axios'

  import { mapActions } from 'vuex'

  export default {
    components: {
      Footer,
      RightBox,
      Card
    },
    data () {
      return {
        count: 0,
        postList: [],
        userId: '',
        userNo: null,
        userName: '',
        visible: false,
        userImg: '',
        pageNum: 0,
        pheed: null,
        maxPheedNum: null
      }
    },
    methods: {
      ...mapActions(['getNewNoti']),
      getAuthUserInfo () {
        axios.get('/user/authuserinfo').then((res) => {
          this.userId = res.data.userId
          this.userName = res.data.userName
          this.userNo = res.data.userNo
          this.userImg = res.data.userRepImg
        })
      },
      getPheedPosts () {
        this.pageNum = this.pageNum + 1
        if (this.maxPheedNum && this.pageNum > this.maxPheedNum) {
          return
        }
        axios.get('/post', {
          params: {
            pageNumber: this.pageNum
          }
        }).then((res) => {
          this.maxPheedNum = res.data.maxPage
          res.data.list.forEach((post) => {
            this.postList.push(post)
          })
        })
      },
      onScroll () {
        const bottomOfWindow = this.pheed.scrollTop + this.pheed.offsetHeight === this.pheed.scrollHeight
        if (bottomOfWindow) {
          this.getPheedPosts()
        }
      }
    },
    created () {
      this.getAuthUserInfo()
    },
    mounted () {
      this.pheed = this.$refs.pheed
      this.getNewNoti()
      this.getPheedPosts()
    }
  }
</script>

<style scoped>
  .pheed-page {
    display: inline-block;
    text-align: center;
    height: 90%;
    overflow-y: scroll;
  }

  .wrapper {
    width: 600px;
    height: 100%;
    padding: 0;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
  }

  .right-box {
    float: right;
    width: 300px;
    margin-left: 1rem;
    padding-top: 30px;
  }

  .pheed {
    padding-top: 20px;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
