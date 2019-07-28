<template>
  <div class="text-box m-3">
    <div class="input-group-text form-control mt-3 p-0 position-relative">
      <div v-if="selectedTagNames">
        <div class="d-inline-block tag-box btn border bg-light" v-for="tag in selectedTagNames" v-bind:key="tag">
          {{tag}}
          <div class="d-inline-block" onclick=""> x</div>
        </div>
      </div>
      <input class="input-group-text form-control"
             placeholder="tag friends..."
             type="text"
             v-model="input"/>
      <div v-if="tagList" class="autocomplete shadow" >
        <div v-for="item in tagList" v-bind:key="item.userNo"
             v-on:click="onClickTag(item)">
          <profile-card class="border p-3"
                        :user-no="item.userNo"
                        :user-id="item.userId"
                        :user-img="item.userRepImg"
                        :user-name="item.userName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import profileCard from './ProfileCard'
  import axios from 'axios'

  export default {
    name: "TagInput",
    components: {profileCard},
    data() {
      return {
        tagList: [],
        selectedTagList: [],
        selectedTagNumbers: [],
        selectedTagNames: [],
        tagInput: "",
        input: ""
      }
    },
    methods: {
      onClickTag(val) {
        if (this.selectedTagNumbers.includes(val.userNo)) {
          this.tagInput = ""
          this.tagList = []
          return
        }
        this.selectedTagList.push(val)
        this.selectedTagNames.push(val.userName)
        this.selectedTagNumbers.push(val.userNo)

        const tagIdx = this.input.indexOf('@')
        this.input = this.input.slice(0, tagIdx)

        this.tagInput = ""
        this.tagList = []
        this.$emit('selectedTags', this.selectedTagNumbers)
      },
    },
    watch: {
      tagInput(val) {
        if (val && val.length > 1) {
          axios.post('/Timeline/tag/searchFriends', val.replace('@', ''))
              .then((res) => {
                this.tagList = res.data
              })
        }
      },
      input() {
        if (this.input.includes('@')) {
          const tagIdx = this.input.indexOf('@')
          this.tagInput = this.input.slice(tagIdx,)
        }
        this.$emit('input', this.input)
      }
    },
  }
</script>

<style scoped>
  .autocomplete {
    margin-top: 4rem;
    z-index: 99;
    position: absolute;
    background-color: white;
    width: 100%;
  }

  .tag-box {
    background-color: white;
  }

</style>
