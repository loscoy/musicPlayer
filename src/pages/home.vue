<template>
  <div class="home">
    <banner></banner>
    <todayRecommend></todayRecommend>
    <NewsMusic></NewsMusic>
    <musicListNav></musicListNav>
    <keep-alive>
      <!-- 保持数据缓存 -->
      <router-view></router-view>
    </keep-alive>
    <todayRecommend title="热门歌单" url="/artists?id=6452"></todayRecommend>
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
