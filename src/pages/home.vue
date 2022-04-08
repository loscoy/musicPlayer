<template>
  <div class="home">
    <banner></banner>
    <todayRecommend></todayRecommend>
    <NewsMusic></NewsMusic>
    <musicListNav></musicListNav>
    <router-view></router-view>
  </div>
</template>

<script>

  import todayRecommend from "../components/TodayRecommend"
  import NewsMusic from "../components/News_Music";
  import banner from "../components/Banner";
  import musicListNav from "./musicLists/musicListNav";
  export default {
    name: "home",
    components:{
      todayRecommend,
      NewsMusic,
      banner,
      musicListNav
    }
  }
</script>

<style scoped>

</style>
