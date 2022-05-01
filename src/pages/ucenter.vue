<template>
  <div class="ucenter">
    <is-login v-if="uid"></is-login>
    <is-not-login v-if="!uid"></is-not-login>
    <play-list-nav v-if="uid"></play-list-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

  import isLogin from "../components/ucenter/isLogin";
  import isNotLogin from "../components/ucenter/isNotLogin";
  import playListNav from "../components/ucenter/playListNav";
  import { mapState } from "vuex";

  export default {
    name: "ucenter",
    components:{
      isLogin,
      isNotLogin,
      playListNav
    },
    computed: {
      ...mapState({
        uid:state => state.user.id,
      }),
    },
    watch:{
      uid(newVal,oldVal){
        console.log(newVal,oldVal);
      }
    }
  }
</script>

<style scoped>

</style>
