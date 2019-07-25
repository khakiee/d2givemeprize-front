<template>
  <div>
    <div class="follow-cells">
      <ul class="nav nav-tabs d-inline-block">
        <li class="nav-item d-inline-block">
          <a class="nav-link active" data-toggle="tab" href="#follower">팔로워</a>
        </li>
        <li class="nav-item d-inline-block">
          <a class="nav-link" data-toggle="tab" href="#followings">팔로잉</a>
        </li>
      </ul>
      <div class="tab-content bg-white p-3">
        <div class="tab-pane fade" id="follower">
          <div v-for="follower in followers" v-bind:key="follower.userName">
            <div v-if="sessionUserNo !== follower.userNo" class="card-box">
              <ProfileCard class="profile-card d-inline-block"
                           :user-no="follower.userNo"
                           :user-id="follower.userId"
                           :user-name="follower.userName"
              />
              <followBtn class="d-inline-block float-right"
                         :user-no="follower.userNo"
                         :is-followed="follower.followed"
              />
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="followings">
          <div v-for="following in followings" v-bind:key="following.userName">
            <div v-if="sessionUserNo !== following.userNo" class="card-box">
              <ProfileCard class="profile-card d-inline-block"
                           :user-no="following.userNo"
                           :user-id="following.userId"
                           :user-name="following.userName"
              />
              <followBtn class="d-inline-block float-right"
                         :user-no="following.userNo"
                         :is-followed="following.followed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ProfileCard from "../components/ProfileCard";
  import FollowBtn from "../components/FollowBtn";
  import store from "../store/store"

  export default {
    name: "UserFollows.vue",
    components: {FollowBtn, ProfileCard},
    data() {
      return {
        followers: [],
        followings: [],
        sessionUserNo: Number,
        thisUserNo: Number
      }
    },
    watch: {
      //https://www.npmjs.com/package/vue-loading-overlay
    },
    methods: {
      async getFollowers() {
        axios.get('/Timeline/user/' + this.thisUserNo + '/followers')
            .then((res) => {
              this.followers = res.data
            })
      },
      async getFollowings() {
        axios.get('/Timeline/user/' + this.thisUserNo + '/followings')
            .then((res) => {
              this.followings = res.data
            })
      },
      onClickFollow(userNo) {
        if (confirm("팔로우 하시겠습니까?")) {
          axios.get('/Timeline/user/' + userNo + '/follow')
          this.getFollowers()
        }
      },
      onClickUnFollow(userNo) {
        if (confirm("팔로우를 취소하시겠습니까?")) {
          axios.get('/Timeline/user/' + userNo + '/unfollow')
          this.getFollowings()
        }
      },
    },
    created() {
      this.sessionUserNo = store.getters.getUid
      this.thisUserNo = this.$route.params.userNo
      this.getFollowings()
      this.getFollowers()
    }
  }
</script>

<style scoped>
  .tab-pane {
    padding-left: 20%;
    padding-right: 20%;
    text-align: center;
  }

  .action-group {
    margin-left: 10rem;
    text-align: right;
  }

  .card-box {
    text-align: left;
  }
</style>
