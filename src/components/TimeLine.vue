<template>
  <container>
    <div class="card">
      <div class="header border-bottom">
        <img class="card-author-profile" src="../assets/logo.png" alt="">
        <div class="card-author">author</div>
      </div>
      <div class="card-body">
        <img class="card-img border-bottom" src="../assets/logo.png" alt=""/>
        <div class="btn-group border-top" role="group">
          <button type="button" class="btn">like</button>
          <button type="button" class="btn">comment</button>
          <button type="button" class="btn">share</button>
        </div>
        <div class="card-text p-4">
          <div class="card-text">Lorem ipsum dolor</div>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
  export default {
    name: "TimeLine",
    props: {
      imgSrc: String,
      text: String
    }
  }
</script>

<style scoped>
  .card {
    width: 500px;
    height: auto;
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
