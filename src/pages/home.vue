<template>
  <div class="home" v-if="active">
    <vue-pull-refresh :on-refresh="onRefresh">
      <banner></banner>
      <todayRecommend></todayRecommend>
      <NewsMusic></NewsMusic>
      <musicListNav></musicListNav>
      <keep-alive>
        <!-- 保持数据缓存 -->
        <router-view></router-view>
      </keep-alive>
      <todayRecommend title="热门歌单" url="/artists?id=6452"></todayRecommend>
    </vue-pull-refresh>
  </div>
</template>

<script>

  import todayRecommend from "../components/TodayRecommend"
  import NewsMusic from "../components/News_Music";
  import banner from "../components/Banner";
  import musicListNav from "./musicLists/musicListNav";
  import vuepullrefresh from "vue-pull-refresh";
  import Vue from 'vue'

  export default {
    name: "home",
    components:{
      todayRecommend,
      NewsMusic,
      banner,
      musicListNav,
      'vue-pull-refresh': vuepullrefresh
    },
    data(){
      return{
        active:true
      }
    },
    methods:{
      onRefresh() {
        const that = this
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            that.active = false
            that.$nextTick(()=>{
              that.active = true
            })
            resolve()
          },1000)
        })
      }
    }
  }
</script>

<style scoped>

</style>
