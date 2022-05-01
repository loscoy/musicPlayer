<template>
  <div class="home" ref="container" v-if="active">
    <mu-load-more @refresh="refresh" :refreshing="refreshing">
      <banner class="banner"></banner>
      <todayRecommend></todayRecommend>
      <NewsMusic></NewsMusic>
      <musicListNav></musicListNav>
      <keep-alive>
        <!-- 保持数据缓存 -->
        <router-view></router-view>
      </keep-alive>
      <todayRecommend title="热门歌单" url="/artists?id=6452"></todayRecommend>
    </mu-load-more>
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
      musicListNav,
    },
    data(){
      return{
        active:true,
        refreshing: false,
      }
    },
    methods:{
      refresh () {
        this.refreshing = true;
        this.$refs.container.scrollTop = 0;
        setTimeout(() => {
          this.refreshing = false;
          this.active = false
          this.$nextTick(() => {
            this.active = true
          });
        }, 1000)
      },
    }
  }
</script>

<style scoped>
  .home{
    z-index: -1;
  }
</style>
