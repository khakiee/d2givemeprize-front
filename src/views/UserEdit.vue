<template>
    <div class="d-inline-block">
        <div>
            <file-pond
                ref="pond"
                label-idle="Drop files here..."
                class="mt-3"
                allow-multiple="true"
                accepted-file-types="image/jpeg, image/png"
            />
            <img v-if="input.userImg" class="img-thumbnail" :src="getImgUrl" alt=""/>
            <div>your profile image here!</div>
            <form class="form-group form-control-lg pt-2" @submit="submitEdit">
                <input class="input-group-text" type="text" name="name" v-model="input.userName"
                       placeholder="UserName"/>
                <p></p>
                <input class="input-group-text" disabled="1" type="text" name="id"
                       :placeholder="input.id"/>
                <p> id는 바꿀 수 없습니다. </p>
                <input class="input-group-text" type="password" name="password" v-model="input.password"
                       placeholder="Password"/>
                <p></p>
                <input class="input-group-text" type="password" name="re-password" v-model="input.re_password"
                       placeholder="re enter Password" v-on:keyup="checkPwMatch"/>

                <div v-if="pwMatchCheck === true" class="text-success"> 사용 가능!</div>
                <div v-if="pwMatchCheck === false" class="text-danger"> pw 불일치!</div>
                <p></p>
                <button :disabled="!pwMatchCheck" class="btn btn-primary">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
  import Router from 'vue-router'
  import Vue from 'vue'

  import vueFilePond, { setOptions } from 'vue-filepond'
  import 'filepond/dist/filepond.min.css'
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

  import AWS from 'aws-sdk'
  import axios from 'axios'
  import env from '../../static/settings_local'
  import { mapActions } from 'vuex'

  const filePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
  const s3 = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: 'ap-northeast-2'
  })

  Vue.use(Router)

  export default {
    name: 'UserEdit',
    components: {
      filePond
    },
    data () {
      return {
        input: {
          id: '',
          password: '',
          re_password: '',
          userName: '',
          userImg: '',
          userNo: null
        },
        pwMatchCheck: null
      }
    },
    methods: {
      ...mapActions(['getNewNoti']),
      checkPwMatch (e) {
        e.preventDefault()
        if (this.input.password === this.input.re_password) {
          this.pwMatchCheck = true
        } else {
          this.pwMatchCheck = false
        }
      },
      submitEdit (e) {
        e.preventDefault()
        axios.put('/user', {
          userId: this.input.id,
          userPwd: this.input.password,
          userName: this.input.userName,
          userRepImg: this.input.userImg,
          userNo: this.input.userNo
        }).then((response) => {
          if (response.data.status === 'success') {
            window.alert('user information edit success')
            this.$router.push('/login')
          } else {
            window.alert('user information edit failed')
          }
        })
      },
      getUserInfo () {
        axios.get('/user/authuserinfo').then((res) => {
          this.input.id = res.data.userId
          this.input.userName = res.data.userName
          this.input.userNo = res.data.userNo
          this.input.userImg = res.data.userRepImg
        })
      },
      setS3Options () {
        const context = this
        setOptions({
          server: {
            process: (fieldName, file, metadata, load) => {
              s3.upload({
                          Bucket: 'd2-resources',
                          Key: 'userimg_folder/' + Date.now(),
                          Body: file,
                          ContentType: file.type,
                          ACL: 'public-read'
                        },
                        {},
                        function (err, data) {
                          if (err) {
                            return
                          }
                          load(data.Key)
                          context.input.userImg = data.Key.toString()
                        })
            }
          }
        })
      }
    },
    computed: {
      getImgUrl () {
        return env.awsS3BucketName + this.input.userImg
      }
    },
    mounted () {
      this.getUserInfo()
      this.setS3Options()
      this.getNewNoti()
    }
  }
</script>

<style scoped>
  .img-thumbnail {
    width: 200px;
    height: 200px;
  }
</style>
