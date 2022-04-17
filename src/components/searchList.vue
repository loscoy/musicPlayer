<template>
  <div class="searchList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>单曲</span>
        <el-button style="float: right; padding: 3px 0" type="text">播放</el-button>
      </div>
      <div v-for="(item,index) in newSearchList" @click="goToSelected(item.id)" :key="index" class="text item">
          <div class="name">{{item.name}}</div>
          <div class="artist">{{item.artist}}</div>
          <div></div>
          <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>

  import {getDetailInfo, getSearchList} from '../Api/music'

  export default {
    name: "searchList",
    data(){
      return{
        newSearchList:this.searchList,
        musicInfo:[],
        artistName:''
      }
    },
    props:{
      searchName:'',
      searchList:[],

    },
    watch:{
      // 监听父组件传值变化
      searchList(val){
        this.newSearchList = val
      }
    },
    mounted() {

      // console.log(this.newSearchList);
    },
    methods:{
      goToSelected(index){
        getDetailInfo(index).then(res=>{
          this.musicInfo = res.data.songs[0]
          this.artistName = ''
          console.log(this.musicInfo.ar.length);
          let l = this.musicInfo.ar.length
          let s = ''
          if(l > 1){
            for (let i=0;i<l;i++){
              if (i+1 < l){
                s = s.concat(this.musicInfo.ar[i].name + ' / ')
              }else{
                s = s.concat(this.musicInfo.ar[i].name)
              }
            }
            this.artistName = s
          }else{
            this.artistName = this.musicInfo.ar[0].name
          }
          // console.log(this.artistName);
          this.$router.push({path:"/musicPlay2",query: {musicId:index,musicName:this.musicInfo.name,musicArtist:this.artistName,musicPic:this.musicInfo.al.picUrl}})
        })
      }
    }
  }
</script>

<style scoped>
  .searchList{
    text-align: center;
    position: relative;
    width: 100%;
    display:flex;
    justify-content: center;
    margin-top: 10px;
  }
  .clearfix .text{
    font-size: 12px;
  }
  .item {
    margin-bottom: 18px;
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
    width: 95%;
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
