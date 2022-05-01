<template>
  <div class="collectPlaylist">
    <el-card class="musicSheet-card" body-style="padding:10px">
      <div style="height: 20px;text-align: left;font-size: 10px;margin-left: 5px;color: #999">收藏歌单</div>
      <div class="mcard-Frame" v-for="(item,index) in collect" :key="index"  @click="getDetail(item.id)">
        <div class="sheet">
          <div class="musicSheet-collect">
            <div class="cover">
              <el-image
                      style="width: 50px; height: 50px;border-radius: 10px"
                      :src="item.coverImgUrl"
                      fit="fill"
                      alt="cover"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="describe">
              <div class="name">
                {{item.name}}
              </div>
              <div class="info">
                <div>{{item.trackCount}}首</div>
                <div class="counter">播放次数:{{item.playCount}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getMusicSheet } from "../../Api/user";
  import { mapState } from "vuex";
  import router from "../../router";

  export default {
    name: "collectPlaylist",
    data () {
      return{
        musicSheet: [],
        created:[],
        collect:[]
      }
    },
    computed: {
      ...mapState({
        uid: state => state.user.id,
      }),
    },
    mounted () {
      if (this.uid){
        this.getMussicSheet()
      }
    },
    methods: {
      getMussicSheet () {
        getMusicSheet(this.uid).then(res => {
          this.musicSheet = res.data.playlist;
          this.handlePlayList()
        });

      },
      handlePlayList () {
        this.musicSheet.forEach(item => {
          if (item.name !== "loscoy喜欢的音乐") {
            item.userId === parseInt(this.uid) ? this.created.push(item) : this.collect.push(item);
          }
        });
      },
      getDetail (playlistId) {
        router.push({ path: "/Umlist",query:{id:playlistId}})
      },
    },
  };
</script>

<style scoped>
  .musicSheet-card{
    width: 100%;
    text-align: center;
    border-radius: 10px;
    margin-top: 10px;
  }
  .sheet{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .musicSheet-collect{
    width: 100%;
    height: 50px;
  }
  .mcard-Frame{
    margin: 5px;
  }
  .collectPlaylist{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
  }
  .cover{
    width: 15%;
    float: left;
  }
  .describe{
    float: right;
    width: 80%;
    margin-top: 8px;
  }
  .info{
    color: #999;
    display: flex;
    font-size: 10px;
  }
  .name{
    font-size: 14px;
    text-align: left;
  }
  .counter{
    margin-left: 20px;
  }
</style>
