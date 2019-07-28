<template>
  <div class="my-modal"
       v-if="visible" @click.self="handleWrapperClick">
    <div class="my-modal__dialog">
      <div class="card-header">
        Followers / Followings
        <button class="close-btn float-right" @click="$emit('update:visible', !visible)">x</button>
      </div>
      <div class="my-modal__body">
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
            <div class="tab-pane fade show active" id="follower">
              <div v-for="follower in followers" v-bind:key="follower.userNo">
                <div v-if="sessionUserNo !== follower.userNo" class="card-box pb-3">
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
              <div v-for="following in followings" v-bind:key="following.userNo">
                <div v-if="sessionUserNo !== following.userNo" class="card-box pb-3">
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
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileCard from './ProfileCard'
  import followBtn from './FollowBtn'
  import store from '../store/store'
  import axios from 'axios'

  export default {
    name: 'followers',
    components: {ProfileCard, followBtn},
    props: {
      visible: {
        type: Boolean,
        require: true,
        default: false
      }
    },
    data() {
      return {
        showWriteBox: false,
        sessionUserNo: null,
        followers: [],
        followings: []
      }
    },
    methods: {
      handleWrapperClick() {
        this.$emit('update:showWriteBox', false)
      }
    },
    mounted() {
      this.sessionUserNo = store.getters.getUid
      axios.get('/Timeline/user/' + store.getters.getUid + '/relation')
          .then((res) => {
            this.followers = res.data.followerList
            this.followings = res.data.followingList
          })
    }
  }
</script>

<style scoped>
  .my-modal {
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0;
  }

  .my-modal__dialog {
    background-color: white;
    display: inline-block;
    vertical-align: center;
    width: 40%;
    height: 50%;
    position: absolute;
    margin-bottom: 50px;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
  }

  .my-modal__body {
    height: 100%;
    overflow-y: scroll;
  }

  .follow-cells {
    width: 100%;
  }

  .tab-pane {
    padding-left: 20%;
    padding-right: 20%;
    text-align: center;
  }

  .card-box {
    text-align: left;
  }

  .close-btn {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }
</style>
