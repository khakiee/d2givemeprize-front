<template>
  <div class="my-modal"
       v-if="visible" @click.self="handleWrapperClick">
    <div class="my-modal__dialog">
      <div class="card-header">
        Write Post
        <button class="close-btn float-right" @click="$emit('update:visible', !visible)">x</button>
      </div>
      <div class="my-modal__body">
        <file-pond ref="pond"
                   label-idle="Drop files here..."
                   allow-multiple="true"
                   accepted-file-types="image/jpeg, image/png"
        />
        <textarea class="form-control input-group-text" type="text"
                  v-model="postText"
                  placeholder="write stories..."
                  style="resize: none; text-align: left;"
        ></textarea>
        <TagInput @selectedTags="selectedTags"/>
        <button class="btn btn-primary" v-on:click="submitPheed">submit</button>
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
  import TagInput from "./TagInput";

  const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
  const s3 = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: 'ap-northeast-2'
  });

  export default {
    name: 'modal',
    components: {TagInput, FilePond},
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
        postText: "",
        imagePaths: [],
        selectedTagList: []
      }
    },
    methods: {
      handleWrapperClick() {
        this.$emit('update:showWriteBox', false)
      },
      submitPheed() {
        axios.post('/Timeline/post', [this.imagePaths, this.selectedTagList, {postContent: this.postText}])
            .then((res) => {
              if (res.status === 200) {
                window.alert('포스팅이 업로드 되었습니다.')
                this.visible = false
              } else {
                window.alter('failed')
              }
            })
      },
      selectedTags(list) {
        this.selectedTagList = list
      },
      setS3UploadOptions() {
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
    },
    mounted() {
      this.setS3UploadOptions()
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
    width: 70%;
    height: 40%;
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
    padding: 10px;
  }

  .close-btn {
    border: none;
    background-color: rgba(0, 0, 0, 0);
  }
</style>
