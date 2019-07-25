<template>
  <div class="my-modal"
       v-if="visible" @click.self="handleWrapperClick">
    <div class="my-modal__dialog">
      <button class="close" @click="$emit('update:visible', !visible)">x</button>
      <div class="my-modal__body">
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
                    placeholder="write stories..."
                    style="resize: none; text-align: left;"
          ></textarea>
          <div class="input-group-text form-control mt-3 p-0 position-relative">
            <div v-if="selectedTagNames">
              <div class="d-inline-block tag-box btn border bg-light" v-for="tag in selectedTagNames">
                {{tag}}
                <div class="d-inline-block"> x</div>
              </div>

            </div>
            <input class="hidden-input input-group-text form-control"
                   placeholder="tag friends..."
                   type="text"
                   v-model="tagInput"/>
            <div v-if="tagList" class="autocomplete" v-for="item in tagList" v-on:click="onClickTag(item)">
              <profile-card class="border p-3"
                            :user-no="item.userNo"
                            :user-id="item.userId"
                            :user-img="item.userRepImg"
                            :user-name="item.userName"
              />
            </div>
          </div>
        </div>
        <button class="btn bg-white border" v-on:click="submitPheed">submit</button>
      </div>
    </div>
  </div>
</template>

<script>
  import env from '../../static/settings_local'

  import vueFilePond, {setOptions} from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  import AWS from 'aws-sdk'
  import axios from 'axios'
  import profileCard from './ProfileCard'

  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
  const s3 = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: 'ap-northeast-2'
  });

  export default {
    name: 'modal',
    components: {FilePond, profileCard},
    props: {
      visible: {
        type: Boolean,
        require: true,
        default: false
      },
      title: {
        type: String,
        require: false,
      },
    },
    data() {
      return {
        showWriteBox: false,
        postText: "",
        imagePaths: [],
        tagList: [],
        selectedTagList: [],
        selectedTagNames: [],
        tagInput: ""
      }
    },
    methods: {
      handleWrapperClick() {
        this.$emit('update:showWriteBox', false)
      },
      submitPheed() {
        axios.post('/Timeline/post', [this.imagePaths, this.selectedTagList, {postContent: this.postText}])
            .then((res) => {
              if (res) {
                window.alert('포스팅이 업로드 되었습니다.')
                this.visible = false
              } else {
                window.alter('failed')
              }
            })
      },
      onClickTag(val) {
        this.selectedTagList.push(val.userNo)
        this.selectedTagNames.push(val.userName)
        this.tagInput = ""
      }
    },
    watch: {
      tagInput: function (val) {
        if (!val.includes('@')) {
          this.tagList = []
        }

        if (val.includes('@') && val.length > 1) {
          console.log(this.tagInput.replace('@', ''))
          axios.post('/Timeline/tag/searchFriends', this.tagInput.replace('@', ''))
              .then((res) => {
                this.tagList = res.data
              })
        }
      }
    },
    mounted() {
      const context = this
      setOptions({
        server: {
          process: (fieldName, file, metadata, load) => {
            s3.upload({
                  Bucket: 'd2-resources',
                  Key: 'postimg_folder/' + Date.now(),
                  Body: file,
                  ContentType: file.type,
                  ACL: 'public-read'
                },
                {},
                function (err, data) {
                  if (err) {
                    return;
                  }
                  load(data.Key);
                  context.imagePaths.push(data.Key.toString())
                })
          }
        }
      });
    }
  }
</script>

<style>
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
    display: inline-block;
    left: 15%;
    vertical-align: center;
    top: 75px;
    width: 70%;
    height: 80%;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
    padding: 20px;
  }

  .my-modal__body {
    height: 100%;
    overflow-y: scroll;
  }

  .hidden-input {
    border: none;
  }

  .autocomplete {
    margin-top: 4rem;
    z-index: 99;
    position: absolute;
    background-color: white;
    width: 100%;
  }

  .tag-box {
    background-color: white;
    color: aqua;
  }

</style>
