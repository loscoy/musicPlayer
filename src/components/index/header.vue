<template>
  <div class="header">
    <div class="header-top">
      <ul v-show="!open">
        <li>
          <mu-button flat @click="open = !open">
            <i class="icon icon-menu" style="font-size: 25px"></i>
          </mu-button>
        </li>
        <li>

        </li>
        <li class="h-avatar">
          <mu-avatar size="35">
            <img :src="userInfo.avatarUrl" alt="">
          </mu-avatar>
        </li>
      </ul>

    </div>
    <drawer :userInfo="userInfo" :open="open" @open1="open1"></drawer>
  </div>
</template>

<script>
  import drawer from "./drawer";
  import { getUserInfo } from "../../Api/user";
  export default {
    name: "header",
    data () {
      return {
        open: false,
        userInfo:[]
      };
    },
    components: {
      drawer
    },
    computed: {
      uid () {
        return this.$store.state.user.id;
      },
    },
    mounted () {
      getUserInfo(this.uid).then(res => {
        this.userInfo={
          avatarUrl: res.data.profile.avatarUrl,
          signature: res.data.profile.signature,
          nickname: res.data.profile.nickname,
          bgUrl:res.data.profile.backgroundUrl
        }
      })
    },
    methods:{
      open1(val){
        this.open = val
      }
    }
  };
</script>

<style scoped>

  .header-top ul{
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 40px;
    list-style: none;
    width: 100%;
  }
  .header-top ul li{
    flex: 1;
    /*text-align: center;*/
    padding: 3px;
  }
  .header-top{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.333);
    backdrop-filter: saturate(180%) blur(20px);
  }
  .h-avatar{
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: right;
  }
  .mu-avatar{
    margin-right: 10px;
  }
</style>
<style>
  .headerC .el-card__body{
    padding: 0;
  }
  .mu-button-wrapper{
    justify-content: left;
  }
  .mu-button{
    width: 30px;
  }
</style>
