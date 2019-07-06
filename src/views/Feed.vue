<template>
  <div class="feed">
    <div style="float: left;">
      <div class="wrapper">
        <scroll-list :debounce="50"
                     :remain="10"
                     :enabled="true"
                     :keep="true"
                     @toTop="onTop"
                     @toBottom="onBottom"
                     @scrolling="onScroll">

          <time-line v-for="item in list" :key="item.index"
                     img-src=""
                     text="item.index"></time-line>
        </scroll-list>
      </div>
    </div>
    <div class="recent-activity-box" style="">
      <div style="width: 300px; background-color: #111111">
        dfasfddfsdasfdaasdfadsffadsadsfadsadsadfssfafsfdffasdasfdfadsadsdsafddfadsafsdf
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLine from "../components/TimeLine";
  import scrollList from 'vue-scroll-list';

  export default {
    components: {
      TimeLine,
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
      onTop() {
        console.log('[demo]:page to top.');
      },
      onBottom() {
        console.log('[demo]:page to bottom.');
        !window.__stopLoadData && this.createData();
      },
      onScroll(event) {
        window.__showScrollEvent && console.log(event);
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
          // this.heightList.push(itemHeight);
        }
        console.log('[demo]:' + size + ' items are created.')
      }
    },
    created() {
      window.__createSize = 40;
      window.__stopLoadData = false;
      window.__showScrollEvent = false;
      this.createData();
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
