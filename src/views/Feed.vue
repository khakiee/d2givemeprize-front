<template>
  <div class="feed">
    <container>
      <time-line img-src=""
                 text=""></time-line>
    </container>
  </div>
</template>

<style>
  .feed {
    display: inline-block;
    text-align: center;
    margin-top: 30px;
  }

</style>
<script>
  import TimeLine from "../components/TimeLine";
  export default {
    components: {TimeLine}
  }
</script>
