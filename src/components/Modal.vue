<template>
  <div class="my-modal"
       v-if="visible" @click.self="handleWrapperClick">
    <div class="my-modal__dialog">
        <button class="close" @click="$emit('update:visible', !visible)">x</button>
      <div class="my-modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
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
    methods: {
      handleWrapperClick() {
        this.$emit('update:showWriteBox', false)
      }
    },
  }
</script>

<style lang="scss">
  $module: 'my-modal';
  .#{$module} {
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0;


    &__dialog {
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

    &__header {
      font-size: 28px;
      font-weight: bold;
      line-height: 1.29;
      padding: 16px 16px 0 25px;
      position: relative;
    }

    &__body {
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>
