<template>
  <div class="header">
    <div class="header-top">
      <ul v-show="!open">
        <li>
          <mu-button flat @click="open = !open">
            <i class="icon icon-menu" style="font-size: 25px"></i>
          </mu-button>
        </li>
        <li class="header-lrc" @click="toMusicplay">
          <i class="icon icon-music" style="margin-right:10px"></i>
          <LRC></LRC>
        </li>
      </ul>
    </div>
    <drawer :userInfo="userInfo" :open="open" @open1="open1"></drawer>
  </div>
</template>

<script>
import drawer from "./drawer";
import Vue from "vue"
import { getUserInfo } from "../../Api/user";
const LRC = Vue.component("lrc", (resolve) => require(["../../components/LRC"], resolve));
export default {
  name: "customHeader",
  data () {
    return {
      open: false,
      userInfo: []
    };
  },
  components: {
    drawer,
    LRC
  },
  computed: {
    uid () {
      return this.$store.state.user.id;
    },
  },
  mounted () {
    if (this.uid) {
      getUserInfo(this.uid).then(res => {
        this.userInfo = {
          avatarUrl: res.data.profile.avatarUrl,
          signature: res.data.profile.signature,
          nickname: res.data.profile.nickname,
          bgUrl: res.data.profile.backgroundUrl
        }
      })
    }
  },
  methods: {
    open1 (val) {
      this.open = val
    },
    toMusicplay(){
      this.$store.dispatch("showMusicplay")
    }
  }
};
</script>

<style scoped>
.header-top ul {
  display: flex;
  justify-content: left;
  height: 50px;
  line-height: 40px;
  list-style: none;
  width: 100%;
  align-items: center;
}

.header-top ul li {
  display: flex;
  padding: 3px;
  align-items: center;
}

.header-top {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.333);
  backdrop-filter: saturate(180%) blur(20px);
}

.mu-avatar {
  margin-right: 10px;
}

.header-lrc {
  width: 90%;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style>
.header .el-card__body {
  padding: 0;
}

.header .mu-button-wrapper {
  justify-content: left;
}

.header .mu-flat-button {
  min-width: 30px;
}
</style>
