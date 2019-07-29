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
      <div>your profile image here!</div>
      <form class="form-group form-control-lg pt-2" @submit="submitSignup">
        <input class="input-group-text" type="text" name="name" v-model="input.userName"
               placeholder="UserName"/>
        <p></p>
        <input class="input-group-text" v-on:keyup="checkIdDup" type="text" name="id" v-model="input.id"
               placeholder="ID"/>
        <div v-if="idDupCheck === true" class="text-success"> 사용 가능!</div>
        <div v-if="idDupCheck === false" class="text-danger"> 사용 불가능!</div>
        <p></p>
        <input class="input-group-text" type="password" name="password" v-model="input.password"
               placeholder="Password"/>
        <p></p>
        <input class="input-group-text" type="password" name="re-password" v-model="input.re_password"
               placeholder="re enter Password" v-on:keyup="checkPwMatch"/>

        <div v-if="pwMatchCheck === true" class="text-success"> 사용 가능!</div>
        <div v-if="pwMatchCheck === false" class="text-danger"> pw 불일치!</div>
        <p></p>
        <button :disabled="!idDupCheck || !pwMatchCheck" class="btn btn-primary">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
  import Router from 'vue-router';
  import Vue from 'vue'

  import vueFilePond, {setOptions} from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  import AWS from 'aws-sdk'
  import axios from 'axios'
  import env from '../../static/settings_local'

  const filePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
  const s3 = new AWS.S3({
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: 'ap-northeast-2'
  });

  Vue.use(Router);

  export default {

    name: 'signup',
    components: {
      filePond
    },
    data() {
      return {
        input: {
          id: "",
          password: "",
          re_password: "",
          userName: "",
          userImg: ""
        },
        idDupCheck: null,
        pwMatchCheck: false
      }
    },
    methods: {
      checkPwMatch(e) {
        e.preventDefault();
        if (this.input.password === this.input.re_password) {
          this.pwMatchCheck = true
        } else {
          this.pwMatchCheck = false
        }
      },
      checkIdDup(e) {
        e.preventDefault();
        axios.post('/Timeline/user/checkdupid', {
          userId: this.input.id
        }).then((res) => {
          if (res.data.status === 'success') {
            this.idDupCheck = true
          } else {
            this.idDupCheck = false
          }
        })
      },
      submitSignup(e) {
        e.preventDefault();
        this.axios.post('/Timeline/user', {
          userId: this.input.id,
          userPwd: this.input.password,
          userName: this.input.userName,
          userRepImg: this.input.userImg
        }).then((response) => {
          if (response.data.status === "success") {
            window.alert('sign up success')
            this.$router.push('/login')
          } else {
            window.alert('sign up failed')
          }
        })
      },
      setS3Options() {
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
                      return;
                    }
                    load(data.Key);
                    context.input.userImg = data.Key.toString()
                  })
            }
          }
        });
      }
    },
    mounted() {
      this.setS3Options()
    }
  }
</script>

<style scoped>

</style>
