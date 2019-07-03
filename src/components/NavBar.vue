<template>
  <div class="navbar border-bottom p-4" style="height: 80px;">
    <div>
      <img src="../assets/logo.png" alt="" style="width: 30px; height: auto;"/>
    </div>
    <div>
      <img src="../assets/logo.png" alt="" class="nav-item"/>
      <img src="../assets/logo.png" alt="" class="nav-item"/>
      <img src="../assets/logo.png" alt="" class="nav-item"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-item {
    width: 40px;
    height: auto;
    margin-left: 20px;
  }
</style>
