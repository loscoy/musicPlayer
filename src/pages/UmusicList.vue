<template>
  <div class="UmusicList">
    <el-card class="box-card">
      <el-skeleton style="width:100%;text-align: center;padding-top: 5px;" :loading="loading" animated>
        <template #template>
          <div
            style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;"
            v-for="i in 10" :key="i"
          >
            <el-skeleton-item variant="text" style="width: 30%" />
            <el-skeleton-item variant="text" style="width: 20%;margin-top: 2px" />
            <el-divider></el-divider>
          </div>
        </template>

        <template #default>
          <div>
            <div class="back" style="display: flex;align-items: center" @click="back">
              <i class="el-icon-back" style="margin-right: 10px"></i>
              <div>歌单</div>
            </div>
            <div style="display: flex;">
              <div class="img" style="max-width: 33%;margin: 20px;overflow:hidden;border-radius: 10px">
                <img :src="likeListSongs[0].al.picUrl">
              </div>
              <div style="margin:20px 20px 20px 0;text-align: left">
                <div>{{playListName}}</div>
                <div style="display: flex;margin-top: 20px;align-items:center;">
                  <div style="border-radius: 50%;overflow:hidden;max-width: 20%;margin-right: 10px"><img :src="user.avatar"></div>
                  <div>{{user.nickname}}</div>
                  <div><i class="el-icon-arrow-right"></i> </div>
                </div>
              </div>
            </div>
          </div>
          <div class="temp">
            <div>
              <div v-for="(item,index) in likeListSongs" @click="playSelected(item.id)" :key="index" class="item">
                <div class="num">{{index+1}}</div>
                <div>
                  <div class="name" style="font-size: 14px">{{item.name}}</div>
                  <div style="display: flex;align-items:center;font-size: 12px">
                    <i v-if="item.pc" class="el-icon-cloudy"></i>
                    <div class="artist">{{artist[index]}}</div>
                  </div>
                </div>
                <div></div>
              </div>
              <div style="font-size: 14px">无更多数据</div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script>
  import { getAllPlaylistMusic, getPlaylistDetail } from "../Api/music";
  import router from "../router";
  import { getUserInfo } from "../Api/user";
  import { mapState } from "vuex";

  export default {
    name: "UmusicList",
    data () {
      return {
        loading: false,
        likeListSongs:[],
        artist: [],
        user:{},
        playListName:'',
      };
    },
    computed: {
      ...mapState({
        uid:state => state.user.id
      }),
    },
    mounted () {
      this.loading = true
      let id = this.$route.query.id
      getPlaylistDetail(id).then(res=>{
        this.playListName = res.data.playlist.name
        console.log(res.data);
      })
      getAllPlaylistMusic(id).then(res=>{
        this.likeListSongs = res.data.songs
        console.log(res.data);
        this.handleArtist()
        setTimeout(()=>{
          this.loading = false
        },500)
      })
      getUserInfo(this.uid).then(res => {
        this.user = {
          avatar:res.data.profile.avatarUrl,
          nickname: res.data.profile.nickname,
        }
      });
    },
    methods: {
      playSelected (musicId) {
        router.push({ path: "/musicplay2", query: { musicId: musicId } });
      },
      handleArtist () {
        this.likeListSongs.forEach(item => {
          let l = item.ar.length
          let s = ''
          if(l>1){
            for (let i = 0; i < l; i++) {
              i + 1 < l ? s = s.concat(item.ar[i].name) + " / " : s = s.concat(item.ar[i].name);
            }
          }else{
            s = item.ar[0].name
          }
          this.artist.push(s)
        });

      },
      back () {
        this.$router.go(-1);
      },

    },
  };
</script>

<style scoped>
  .UmusicList{
    margin: 10px auto;
    width: 95%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .item {
    margin-bottom: 18px;
    text-align: left;
    display: flex;
  }
  .box-card {
    width: 100%;
    border-radius: 10px;
  }
  .artist{
    position: relative;
    font-size: 5px;
    color: #999999;
  }
  .clearfix span{
    font-weight: bolder;
  }
  .num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    color: #999;
    font-size: 15px;
    font-family: 'Helvetica Neue';
    margin-right: 20px;
  }
</style>
