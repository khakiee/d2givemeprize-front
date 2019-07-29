<template>
    <div class="r-box">
        <div class="pt-3 ml-4 text-left">
            <profileCard class="d-inline-block"
                         :user-name="userName"
                         :user-id="userId"
                         :user-no="userNo"
                         :user-img="userProfileImg"
            ></profileCard>
        </div>
        <div class="p-3">
            <button class="btn write-post border bg-white" v-on:click="onClickWriteBox">
                게시글 작성하기
            </button>
        </div>

        <div v-if="recommendedFriends.length" class="font-weight-bold">
            <hr/>
            친구 추천 목록
        </div>
        <div class="card mb-4" v-for="person in recommendedFriends" v-bind:key="person.userName">
            <profile-card class="d-inline-block"
                          :user-no="person.userNo"
                          :user-id="person.userId"
                          :user-name="person.userName"
                          :user-img="person.userImg"
            />
            <followBtn class="d-inline-block float-right"
                       :user-no="person.userNo"
                       :is-followed="person.followed"
            />
        </div>
        <modal :visible.sync="showWriteBox">
        </modal>
    </div>
</template>

<script>
  import Modal from './WritePostModal'
  import axios from 'axios'
  import profileCard from './ProfileCard'
  import FollowBtn from './FollowBtn'

  export default {
    name: 'RightBox',
    components: { FollowBtn, profileCard, Modal },
    props: {
      userName: String,
      userNo: Number,
      userId: String,
      userProfileImg: String
    },
    data () {
      return {
        showWriteBox: false,
        recommendedFriends: []
      }
    },
    methods: {
      getUserPageUrl () {
        return '/user/' + this.userNo
      },
      onClickWriteBox () {
        this.showWriteBox = !this.showWriteBox
      },
      submitPheed () {
        axios.post('/Timeline/post', [this.imagePaths, { postContent: this.postText }]).then((res) => {
          if (res.status === 200) {
            window.alert('포스팅이 업로드 되었습니다.')
            this.showWriteBox = false
          } else {
            window.alter('failed')
          }
        })
      },
      getRecommendedFriends () {
        axios.get('/Timeline/user/recommend').then((res) => {
          if (res.status === 200) {
            this.recommendedFriends = res.data
          }
        })
      }
    },
    mounted () {
      this.getRecommendedFriends()
    }
  }
</script>

<style scoped>

  .write-post {
    border-radius: 0.5rem;
    width: 100%;
    height: 10%;
  }

  .r-box {
    width: 300px;
    padding-top: 0;
  }

  .card {
    text-align: left;
    margin-top: 10px;
    padding: 10px;
    vertical-align: top;
    display: inline-block;
    height: 100%;
    width: 90%;
  }
</style>
