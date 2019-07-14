<template>
  <div class="feed">
    <div style="float: left;">
      <div class="wrapper">
        <scroll-list :debounce="50"
                     :remain="10"
                     :enabled="true"
                     :keep="true">

          <Card v-for="item in list" :key="item.index"
                img-src=""
                text="temp scroller, TODO : make virtual list"></Card>
        </scroll-list>
      </div>
    </div>
    <div class="recent-activity-box" style="">
      <RightBox></RightBox>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Card from "../components/Card";
  import scrollList from 'vue-scroll-list';
  import RightBox from "../components/RightBox";
  import Footer from "../components/Footer";

  export default {
    components: {
      Footer,
      RightBox,
      Card,
      scrollList
    },
    data() {
      return {
        list: [],
        heightList: [],
        count: 0
      }
    },
    methods: {
      onBottom() {
        this.createData()
      },
      createData() {
        let size = window.__createSize || 40;
        this.count += size;
        for (let i = this.count - size; i < this.count; i++) {
          let itemHeight = Math.round(Math.random() * 100) + 40;
          this.list.push({
            index: i,
            itemHeight: itemHeight
          });
        }
      }
    },
    created() {
      window.__createSize = 40;
      window.__stopLoadData = false;
      window.__showScrollEvent = false;
      this.createData();
    },
    mounted() {
      this.$http.post('/Timeline/post/loadMyPheed')
          .then((res) => {
            console.log(res.data)
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
