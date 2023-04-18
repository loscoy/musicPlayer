<template >
  <div class="slider">
    <mu-card>
      <mu-drawer :open.sync="open1" :docked="docked">
        <div class="bg" :style="{'background-image':'url('+ userInfo.bgUrl +')'}"></div>
        <mu-card-header :title="userInfo.nickname" :sub-title="userInfo.signature">
          <mu-avatar slot="avatar">
            <img :src="userInfo.avatarUrl">
          </mu-avatar>
          <div class="filter"></div>
        </mu-card-header>
        <mu-list>
          <mu-list-item button @click="openSetting">
            <mu-list-item-action>
              <i class="icon icon-settings"></i>
            </mu-list-item-action>
            <mu-list-item-title>设置</mu-list-item-title>
            <mu-list-item-action>
              <i class="icon icon-chevron-right"></i>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <i class="icon icon-mail"></i>
            </mu-list-item-action>
            <mu-list-item-title>我的消息</mu-list-item-title>
            <mu-list-item-action>
              <i class="icon icon-chevron-right"></i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <mu-button round style="position: absolute;bottom: 0;right: 0;margin: 15px" @click="logout">
          退出登录
        </mu-button>
      </mu-drawer>
      <mu-dialog title="消息和隐私设置" width="95%" max-width="95%" :esc-press-close="false" :overlay-close="false" :open.sync="openS">
        <setting :openSetting="openS"></setting>
        <mu-button slot="actions" flat color="primary" @click="openS=false">关闭</mu-button>
      </mu-dialog>
    </mu-card>
  </div>
</template>

<script>
  import { logOut } from "../../Api/user";
  import setting from "./slider/setting";
  import { mapState } from 'vuex'

  export default {
    name: "slider",
    data () {
      return {
        docked: false,
        open1: false,
        openS: false,
      };
    },
    props: {
      open: false,
      userInfo: [],
    },
    components: {
      setting
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      open (val) {
        this.open1 = val;
      },
      open1 (val) {
        this.$emit("open1", val);
      },
    },
    mounted () {

    },
    methods:{
      openSetting () {
        this.open1 = false;
        this.openS= true
      },
      logout () {
        let _this = this
        if (_this.user.id !== null) {
          logOut().then(res => {
            console.log(res);
            location.reload()
          });
          _this.$store.dispatch("clearUser")
        } else {
          _this.$toast.info("未登录");
        }
      },
    }
  };
</script>

<style scoped>
  .slider{
    height: 100%;
    z-index: 12;
  }
  .slider .li{
    font-size: 14px;
  }
  .bg{
    height:150px;
    background-size:100%;
    top: 0;
    left: 0;
  }
  .mu-item-action{
    min-width: 30px;
  }
</style>
<style>
  .mu-overlay{
    z-index:9!important;
  }
</style>
