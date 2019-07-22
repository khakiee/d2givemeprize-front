<template>
  <div class="r-box">
    <div>
      <div class="profile">
        <a :href="getMyPageUrl()">
          <img class="profile-img" src="../assets/logo.png" alt=""/>
          <div class="profile-namecard">
            <div class="name">{{this.userName}}</div>
            <div class="id">{{this.userId}}</div>
          </div>
        </a>
      </div>

      <button class="btn write-post border bg-white" v-on:click="onClickWriteBox">
        게시글 작성하기
      </button>
      <modal :visible.sync="showWriteBox">
        <div>
          <file-pond
                  ref="pond"
                  label-idle="Drop files here..."
                  allow-multiple="true"
                  accepted-file-types="image/jpeg, image/png"
          />
        </div>
        <div class="text-box m-3">
          <textarea class="form-control input-group-text" type="text"
                    v-model="postText"
                    style="resize: none; text-align: left;"></textarea>
        </div>
        <button class="btn bg-white border" v-on:click="submitPheed">submit</button>

      </modal>
    </div>
  </div>
</template>

<script>
  import Modal from "./Modal";
  import store from "../store/store"
  import env from '../../static/settings_local'

  import vueFilePond, {setOptions} from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  import AWS from 'aws-sdk'
  import axios from 'axios'

  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
  const s3 = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: 'ap-northeast-2'
  });

  export default {
    name: "RightBox",
    components: {Modal, FilePond},
    props: {
      userName: String,
      userNo: Number,
      userId: String,
      userProfileImg: String
    },
    data() {
      return {
        showWriteBox: false,
        postText: "",
        imagePaths: []
      }
    },
    methods: {
      getMyPageUrl: function () {
        return "/user/" + this.userNo
      },
      onClickWriteBox: function () {
        this.showWriteBox = !this.showWriteBox
      },
      submitPheed: function () {
        axios.post('/Timeline/post', [this.imagePaths, {postContent: this.postContent}]).then((res) => {
          if (res) {
            window.alert('포스팅이 업로드 되었습니다.')
            store.
            this.showWriteBox = false
          } else {
            window.alter('failed')
          }
        })
      }
    },
    mounted() {
      let kk = this
      setOptions({
        server: {
          process: function (fieldName, file, metadata, load) {
            s3.upload({
                  Bucket: 'd2-resources',
                  Key: '/postimg_folder/' + Date.now(),
                  Body: file,
                  ContentType: file.type,
                  ACL: 'public-read'
                },
                function (err, data) {
                  if (err) {
                    console.log("errerr", data)
                    return;
                  }
                  load(data.Key);
                  kk.imagePaths.push(data.Key)
                });

          }
        }
      });
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

  .text-box {
    text-align: left;
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

  .name {
    font-weight: bold;
  }

  .id {
    font-size: smaller;
    color: gray;
  }

  .write-post {
    border-radius: 0.5rem;
    width: 100%;
    height: 10%;
  }

  .r-box {
    width: 300px;
    padding: 40px;
  }
</style>
