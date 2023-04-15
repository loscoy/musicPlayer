<template>
  <div class="isNotLogin">
    <div class="user-list-info">
      <el-card class="top-card">
        <div class="tx">
          <div class="avatar">
            <el-image
                    style="width: 50px; height: 50px"
                    :src="require('@/assets/img/avatar.png')"
                    fit="fill"
                    alt="头像"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </div>
        <div class="info-card">
          <div class="info-name">
            <div class="nickName" @click="openLogin">
              立即登录<i class="el-icon-arrow-right"></i>
            </div>

            <el-dialog :visible.sync="openAlert" width="90%" class="loginDialog">
              <div class="dialogTitle">{{title}}</div>
              <div @click="changeComp('loginQRVue', '二维码登陆', '')">二维码登陆</div>
              <component @change="changeComp" @closeAlert="closeAlertDialog" :is="comp"></component>
            </el-dialog>
            <!-- <mu-dialog :title="title" width="600" max-width="90%" style="border-radius:10px"
                       :esc-press-close="false" :overlay-close="false" :open.sync="openAlert"
            >
              <component @change="changeComp" @closeAlert="closeAlertDialog" :is="comp"></component>
              <mu-button slot="actions" flat color="primary"  @click="closeAlertDialog">{{actions}}</mu-button>
            </mu-dialog> -->

          </div>
        </div>
      </el-card>
      <el-card class="music-like" body-style="padding:10px">
        <div class="like-cover">
          <el-image
                  style="width: 50px; height: 50px;border-radius: 10px"
                  :src="require('@/assets/img/likePlaylist.png')"
                  fit="fill"
                  alt="cover"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="like-describe">
          <div class="like-name" style="width: 100%">
            我喜欢的音乐
          </div>
          <div class="like-info">
            <div>0首</div>
          </div>
        </div>
      </el-card>
      <el-menu :default-active="activeIndex" class="playListNav" mode="horizontal" @click="handleSelect" style="border-radius:10px;text-align:center;width: 95%;margin: 20px 10px 10px 10px;">
          <el-menu-item class="item" index="1"  style="width: 50%;">创建歌单</el-menu-item>
          <el-menu-item class="item" index="2" style="width: 50%">收藏歌单</el-menu-item>
      </el-menu>
      <el-card class="musicSheet-card" body-style="padding:10px">
        <div style="height: 20px;text-align: left;font-size: 10px;margin-left: 5px;color: #999">创建歌单</div>
        <div class="mcard-Frame" >
          <div class="sheet">
            <div class="musicSheet-creat">
              <i class="el-icon-circle-plus"></i>
              一键导入外部音乐
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import login from "../login && regist/login";
  import loginQRVue from '../login && regist/loginQR.vue';
  import register from "../login && regist/register";
  import resetPassword from "../login && regist/resetPassword";
  export default {
    name: "isNotLogin",
    data () {
      return {
        musicSheet: [],
        activeIndex: "1",
        openAlert: false,
        title: "登录",
        comp: "login",
        actions: "暂不登录",
      };
    },
    components: {
      login,
      register,
      resetPassword,
      loginQRVue
    },
    mounted () {

    },
    methods:{
      openLogin () {
        this.openAlert = true
      },
      closeAlertDialog  () {
        this.openAlert = false;
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      changeComp(component,title,actions){
        this.comp = component
        this.title = title
        this.actions = actions
      }
    }
  };
</script>

<style scoped>
  .user-list-info{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
  }
  .avatar{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 55px auto;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    overflow: hidden;
  }
  .top-card{
    width: 95%;
    text-align: center;
    height: 90px;
    margin-top: 30px;
    border-radius: 10px;
  }
  .music-like{
    width: 95%;
    height: 70px;
    border-radius: 10px;
    margin-top: 10px;
  }
  .musicSheet-card{
    width: 95%;
    text-align: center;
    border-radius: 10px;
    margin-top: 10px;
  }
  .sheet{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .musicSheet-creat{
    width: 100%;
    height: 50px;
  }
  .tx{
    text-align: center;
  }
  .nickName{
    position: relative;
    font-weight: bold;
  }
  .info-card{
    height: 55px;
    margin-top: 15px;
  }
  .info-name{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
  }
  .nickName{
    width: 100%;
  }

  .mcard-Frame{
    margin: 5px;
    padding: 10px;
    height: 30px;
  }
  .like-cover{
    width: 15%;
    float: left;
  }
  .like-describe{
    float: right;
    width: 80%;
    margin-top: 8px;
  }
  .like-info{
    color: #999;
    display: flex;
    font-size: 10px;
  }
  .like-name{
    font-size: 14px;
  }
   .item{
     float: left;
     height: 60px;
     line-height: 40px;
     display: flex;
     justify-content: center;
     align-items: center;
     margin: 0;
     border-bottom: 2px solid transparent;
     color: #909399;
  }
  .loginDialog {
    text-align: left;
  }
  .dialogTitle {
    font-size: 20px;
    padding-left: 10px;
  }
</style>
<style>
  .mu-dialog{
    border-radius: 10px;
  }
</style>
