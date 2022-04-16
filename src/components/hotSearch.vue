<template>
  <div class="hotSearch">
    <div class="title">
      热搜榜
    </div>
<!--    <el-skeleton rows="6"/>-->
    <ul>
      <li>周杰伦</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "hotSearch",
    props:{
      searchListShow:true
    }
  }
</script>

<style scoped>

  body{
    text-align: center;
    align-items: center;
  }
  .hotSearch{
    position: relative;
    border: solid;
    width: 95%;
  }
  .title{
    text-align: left;
    margin: 10px 40px;
  }

</style>
