<template>
  <div class="ucenter">
    <div class="user-list-info">
      <el-card class="top-card">
        <div class="tx">
          <div class="avatar">
            <el-image
                    style="width: 100px; height: 100px"
                    :src="userInfo.profile.avatarUrl"
                    fit="fill"
                    alt="头像"
            ></el-image>
          </div>
        </div>
        <div class="info-card">
          <div class="info-name">
            <div class="nickName">
              {{userInfo.profile.nickname}}
            </div>
            <div class="info-else">
              <div class="follows">{{userInfo.profile.follows}} 关注</div>
              <el-divider direction="vertical"></el-divider>
              <div class="followeds">{{userInfo.profile.followeds}} 粉丝</div>
              <el-divider direction="vertical"></el-divider>
              <div class="level">Lv.{{userInfo.level}}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { getUserInfo } from "../Api/user";

  export default {
    name: "ucenter",
    data () {
      return {
        userInfo: [],
        uid:sessionStorage.getItem('userid')
      };
    },
    mounted () {
      getUserInfo(this.uid).then(res => {
        this.userInfo = res.data
        console.log(res.data);
      });
    }
  }
</script>

<style scoped>
  .user-list-info{
    display: flex;
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
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
  .top-card{
    width: 95%;
    text-align: center;
    height: 110px;
    margin-top: 55px;
    border-radius: 10px;
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
    margin-top: 37px;
  }
  .info-name{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
  }
  .nickName{
    width: 100%;
  }
  .info-else{
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #999999;
    height: 25px;
  }
</style>
