<template>
  <div class="ucenter">
    <is-login v-if="uid"></is-login>
    <is-not-login v-if="!uid"></is-not-login>
    <play-list-nav></play-list-nav>
    <router-view></router-view>
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
  }
</script>

<style scoped>

</style>
