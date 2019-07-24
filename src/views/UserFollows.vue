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
            <ProfileCard class="d-inline-block"
                         :user-no="follower.userNo"
                         :user-id="follower.userId"
                         :user-name="follower.userName"
            ></ProfileCard>
            <div class="action-group d-inline-block">
              <follow-btn :user-no="followings.userNo"
                          :is-followed=True
              ></follow-btn>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="followings">
          <div v-for="(idx, following) in followings" v-bind:key="following.userName">
            <div class="d-inline-block">
              <ProfileCard :user-no="following.userNo"
                           :user-id="following.userId"
                           :user-name="following.userName"
              ></ProfileCard>
            </div>
            <div class="action-group float-right d-inline-block">
              <follow-btn :user-no="followings.userNo"
                          :is-followed=True
              ></follow-btn>
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

  export default {
    name: "UserFollows.vue",
    components: {FollowBtn, ProfileCard},
    data() {
      return {
        followerList: [],
        followingList: [],
        sessionUserNo: Number,
        thisUserNo: Number
      }
    },
    methods: {
      getFollowers() {
        axios.get('/Timeline/user/' + this.sessionUserNo + '/followers')
            .then((res) => {
              this.followers = res.data
            })
      },
      getFollowings() {
        axios.get('/Timeline/user/' + this.sessionUserNo + '/followings')
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
    mounted() {
      this.sessionUserNo = this.$route.params.userNo
      this.getFollowers()
      this.getFollowings()
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
  }
</style>
