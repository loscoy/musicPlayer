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
            <div class="nickName" @click="pushLogin">
              立即登录<i class="el-icon-arrow-right"></i>
            </div>
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
  export default {
    name: "isNotLogin",
    data () {
      return {
        musicSheet: [],
        activeIndex: "1",
      };
    },

    mounted () {

    },
    methods:{
      pushLogin () {
        this.$message("正在跳转登录页");
        setTimeout(() => {
          this.$router.push("/loginPage/login");
        }, 1000);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
</style>
