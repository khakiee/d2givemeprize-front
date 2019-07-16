<template>
  <div class="card">
    <div class="header border-bottom">
      <img class="card-author-profile" src="../assets/logo.png" alt="">
      <div class="card-author">{{this.author}}</div>
    </div>
    <div class="card-body">
      <img v-if="imgSrc" class="card-img border-bottom" src="../assets/logo.png" alt=""/>
      <div class="card-text p-4">
        <div class="card-text">{{this.text}}</div>
      </div>
      <div class="btn-group border-top" role="group">
        <button type="button" class="btn">like</button>
        <button type="button" class="btn">comment</button>
        <button type="button" class="btn">Details</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      imgSrc: String,
      text: String,
      author: String
    }
  }
</script>

<style scoped>
  .card {
    margin-bottom: 50px;
  }

  .card-text {
    text-align: left;
  }

  p.card-text {
    width: 250px;
    display: inline-block;
    border: 1px solid #111;
    word-wrap: break-word;
  }

  .btn-group {
    width: 100%;
  }

  .btn {
    border-radius: 0;
    background-color: white;
  }

  .header {
    padding: 10px;
  }

  .card-body {
    padding: 0;
  }

  .card-author-profile {
    width: 20px;
    height: auto;
    float: left;
    vertical-align: center;
  }

  .card-author {
    float: left;
    vertical-align: center;
    margin-left: 10px;
    font-weight: bold;
  }
</style>
