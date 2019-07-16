<template>
  <div class="feed">
    <div style="float: left;">
      <div class="wrapper">
        <scroll-list :debounce="50"
                     :remain="10"
                     :enabled="true"
                     :keep="true">

          <Card v-for="item in postList" :key="item.postNo"
                :img-sr="item.postImg"
                :text="item.postContent"
                :author="item.userName"
          ></Card>
        </scroll-list>
      </div>
    </div>
    <div class="recent-activity-box" style="">
      <RightBox :user-id="userId"
                :user-name="userName"

      ></RightBox>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import scrollList from 'vue-scroll-list';
  import RightBox from "../components/RightBox";
  import Footer from "../components/Footer";
  import store from "../store/store"

  export default {
    components: {
      Footer,
      RightBox,
      Card,
      scrollList
    },
    data() {
      return {
        count: 0,
        postList: [],
        userId: String,
        userName: String
      }
    },
    methods: {
      getUserInfo: function () {
        this.userId = store.getters.getLid
        this.userName = store.getters.getUname
      }
    },
    created() {
      window.__createSize = 40;
      window.__stopLoadData = false;
      window.__showScrollEvent = false;
      this.getUserInfo()
      console.log(this.userName, this.userId)
    },
    mounted() {
      this.$http.post('/Timeline/post/loadMyPheed')
          .then((res) => {
            this.postList = res.data
          }).catch((err) => {
            err.print()
      })
    }
  }
</script>

<style>
  .feed {
    display: inline-block;
    text-align: center;
  }

  .wrapper {
    width: 600px;
    height: 800px;
    padding: 0;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
  }

  .item {
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }

  .item:last-child {
    border-bottom: 0;
  }

  .scroll-container {
    transform: translate3d(0, 0, 0);
    padding-top: 30px;
  }

  .recent-activity-box {
    float: right;
    width: 300px;
    margin-left: 1rem;
    padding-top: 30px;
  }

  ::-webkit-scrollbar {
    display: none;
  }


</style>
