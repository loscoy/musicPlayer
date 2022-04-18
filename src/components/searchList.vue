<template>
  <div class="searchList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>单曲</span>
      </div>
      <el-skeleton style="width:100%;text-align: center;padding-top: 5px;" :loading="loading" animated>
        <template #template>
          <div
                  style="display: flex; flex-direction: column; align-items: flex-start; justify-items: space-between;"
                  v-for="i in 10" :key="i"
          >
            <el-skeleton-item variant="text" style="width: 30%" />
            <el-skeleton-item variant="text" style="width: 20%;margin-top: 2px" />
            <el-divider></el-divider>
          </div>
        </template>

        <template #default>
            <div v-for="(item,index) in newSearchList" @click="goToSelected(item.id)" :key="index" class="text item">
                <div class="name">{{item.name}}</div>
                <div class="artist">{{item.artist}}</div>
                <div></div>
                <el-divider></el-divider>
            </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script>

  import { getDetailInfo } from "../Api/music";

  export default {
    name: "searchList",
    data(){
      return{
        newSearchList:this.searchList,
        musicInfo:[],
        artistName:'',
        loading:false
      }
    },
    props:{
      searchName:'',
      searchList:[],
    },
    watch:{
      // 监听父组件传值变化
      searchList(val){

        this.newSearchList = val;
        setTimeout(()=>(this.loading = false),500)
      }
    },
    mounted() {
      this.loading = true
    },
    methods: {
      goToSelected (index) {
        getDetailInfo(index).then(res => {
          this.musicInfo = res.data.songs[0];
          this.artistName = "";
          // console.log(this.musicInfo.ar.length);
          let l = this.musicInfo.ar.length;
          let s = "";
          if (l > 1) {
            for (let i = 0; i < l; i++) {
              if (i + 1 < l) {
                s = s.concat(this.musicInfo.ar[i].name + " / ");
              } else {
                s = s.concat(this.musicInfo.ar[i].name);
              }
            }
            this.artistName = s;
          } else {
            this.artistName = this.musicInfo.ar[0].name;
          }
          // console.log(this.artistName);
          this.$router.push({
            path: "/musicPlay2",
            query: {
              musicId: index,
              musicName: this.musicInfo.name,
              musicArtist: this.artistName,
              musicPic: this.musicInfo.al.picUrl,
            },
          });
        });
      },
    },
  }
</script>

<style scoped>
  .searchList{
    text-align: center;
    position: relative;
    width: 95%;
    display:flex;
    justify-content: center;
    margin-top: 10px;
  }
  .clearfix .text{
    font-size: 12px;
  }
  .item {
    margin-bottom: 18px;
    text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    text-align: left;
  }
  .artist{
    position: relative;
    font-size: 5px;
    color: #999999;
  }
  .el-divider--horizontal{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
  }
  .clearfix span{
    font-weight: bolder;
  }
</style>
