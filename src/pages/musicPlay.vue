<template>
  <div class="play">
    <div class="header">
      <div class="title">
        <router-link to="/">
          <i class="iconfont icon-shouye left"></i>
        </router-link>
        <div class="music-info">
          <p>{{musicName}}</p>
          <p class="author">{{musicArtist}}</p>
        </div>
        <router-link to="/search">
          <i class="iconfont icon-sousuo right"></i>
        </router-link>
      </div>
    </div>

    <div class="song-info">
      <div class="song-info-img">
        <img :src="musicPic" :alt="musicName">
        <div class="song-lrc">
          <LRC :currentTime="parseInt(currentTime)" :durationTime="parseInt(durationTime)" :lrcId="parseInt(musicId)"></LRC>
        </div>
      </div>
      <div class="iconbox">
        <i @click="collectHandler" :class={ca:collectAction} class="iconfont icon-shoucang2 left"></i>
        <i class="box"></i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <!--音乐控制组件
    <aplayer
      showlrc="true"
      :music="{
        title: musicName,
        artist: musicArtist,
        src: musicUrl,
        pic: musicPic,
        lrc: lrcData
       }"
    ></aplayer>-->
    <div class="song">
      <audio ref="player" :src="musicUrl" controls></audio>
    </div>
  </div>
</template>

<script>

  import Aplayer from 'vue-aplayer'
  import Vue from "vue"
  import axios from "@/plugins/axios"
  // import LRC from "../components/LRC";

  const LRC = Vue.component("lrc",(resolve)=>require(["../components/LRC"],resolve))

  export default {
    name: "musicPlay",
    data(){
      return{
        musicId: this.$route.query.musicId,
        musicName: this.$route.query.musicName,
        musicArtist: this.$route.query.musicArtist,
        musicUrl: '',
        musicPic: this.$route.query.musicPic,
        currentTime:0,
        durationTime:0,
        lrcData:''
      }
    },
    props:{
      music:''
    },
    components:{
      LRC,
    },
    mounted() {
      const url = "/song/url?id=" + this.musicId
      axios.get(url).then(res=>{
        this.musicUrl = res.data.data[0].url
        // console.log(this.lId[0].id)
      })
      this.addEventListeners();
    },
    beforeDestroyed(){
      this.removeEventListeners();
    },
    methods:{
      collectHandler(){

      },
      collectAction(){

      },
      addEventListeners(){
        this.$refs.player.addEventListener('timeupdate', this._currentTime)
        this.$refs.player.addEventListener('canplay', this._durationTime)
      },
      removeEventListeners(){
        this.$refs.player.removeEventListener('timeupdate', this._currentTime)
        this.$refs.player.removeEventListener('canplay', this._durationTime)
      },
      _currentTime(){
        this.currentTime = this.$refs.player.currentTime
        // currentTime是audio标签提供的获取当前播放时间的方法
      },
      _durationTime(){
        this.durationTime = this.$refs.player.duration
        // duration是audio标签提供的获得歌曲播放整体时间的方法
      }
    }
  }
</script>

<style scoped>

  .play{
    /*position: relative;*/
    text-align: center;
  }
  .header{
    padding: 15px;
  }
  .music-info{
    flex: 1;
    font-size: 20px;
  }
  .title{
    display: flex;
    text-align: center;
  }
  .left{
    font-size: 30px;
  }
  .ca{
    color: red;
  }
  .right{
    font-size: 30px;
  }
  .song-info{
    padding: 15px;
  }
  .song-info-img{
    text-align: center;
  }
  .song-info-img img{
    width: 50%;
    border-radius: 15%;
  }
  .song-lrc{
    margin-top: 30px;
    min-height: 50px;
  }
  .iconbox{
    display: flex;
    margin-top: 30px;
    position: absolute;
    bottom: 70px;
    width: 90%;
  }
  .iconbox .box{
    flex: 1;
    height: 70%;
  }
  .song{
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .song audio{
    width: 100%;
  }
  .active{
    color: #222;
  }
  .author{
    color: #999;
    font-size: 12px;
  }

</style>
