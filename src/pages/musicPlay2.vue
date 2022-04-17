<template>
  <div class="play">
    <div class="header">
      <div class="title">
        <router-link to="">
          <i class="iconfont icon-shouye left" @click="back"></i>
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
<!--          <LRC2 :currentLyric="currentLyric" :currentLyricNum="currentLyricNum" :lrcId="parseInt(musicId)"></LRC2>-->
          <ul ref="ul" class="content">
            <li :id="index" v-for="(item,index) in currentLyric.lines" @click="playThis(index)" :key="index">{{item.txt}}</li>
          </ul>
          <div class="no-lyric" v-if="lrcLength === 0">暂无歌词,请搜索重试</div>
        </div>

      </div>

      <div class="iconbox">
        <i @click="collectHandler" :class={ca:collectAction} class="iconfont icon-shoucang2 left"></i>
        <i class="box"></i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <div class="song">
      <audio ref="player" :src="musicUrl" controls></audio>
    </div>
  </div>
</template>

<script>

  import Vue from "vue"
  import axios from "@/plugins/axios"
  import iconfont from "@/assets/font/iconfont.css"
  import Lyric from 'lyric-parser'
  import {getDetailInfo, getLyric} from "../Api/music";
  // import LRC from "../components/LRC";

  const LRC2 = Vue.component("lrc",(resolve)=>require(["../components/LRC2"],resolve))

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
        currentLyric:{},
        lyric: '',
        currentLyricNum:0,

        lineNo: 0,
        Cpos: 3,
        offset: -32,
        lrcLength:0,
      }
    },
    components:{
      LRC2,
    },
    created() {

    },
    mounted() {
      this.getLyric(this.musicId)
      const url = "/song/url?id=" + this.musicId
      axios.get(url).then(res=>{
        this.musicUrl = res.data.data[0].url
      })
      const music = this.$refs.player  // 音频所在对象
      music.addEventListener('timeupdate', () => {
        if(this.lineNo===this.lrcLength)
          return;
        const curTime = music.currentTime; //播放器时间
        if(this.currentLyric.lines[this.lineNo].time <= curTime * 1000){
          this.lineHigh();//高亮当前行
          this.lineNo++;
        }
      })
      music.addEventListener('ended', () => {
        this.goback(); //回滚歌词
        music.play()
      })
    },
    beforeDestroyed:{
      removeEventListeners(){
        const music = this.$refs.player  // 音频所在对象
        music.removeEventListener('timeupdate', () => {
          if(this.lineNo===this.lrcLength)
            return;
          const curTime = music.currentTime; //播放器时间
          if(this.currentLyric.lines[this.lineNo].time <= curTime * 1000){
            this.lineHigh();//高亮当前行
            this.lineNo++;
          }
        })
        music.removeEventListener('ended', () => {
          this.goback(); //回滚歌词
          music.play()
        })
      },
    },
    methods: {
      // 异步获取歌词
      async getLyric(id) {
        try {
          let res = await getLyric(id)
          this.lyric = res.data.lrc.lyric
          this.currentLyric = new Lyric(this.lyric, this.lyricHandle)
          this.lrcLength = this.currentLyric.lines.length
        } catch (error) {
          console.log(error)
        }
      },

      collectHandler() {

      },
      collectAction() {

      },

      lyricHandle({ lineNum, txt }) {

      },
      //点击播放
      playThis(index) {
        const music = this.$refs.player
        const ulist = this.$refs.ul
        const list = ulist.getElementsByTagName("li");

        // 删除之前的高亮样式与设置当前点击部分高亮样式
        list[this.lineNo-1].removeAttribute("class");//去掉上一行的高亮样式
        this.lineNo = index
        list[this.lineNo].className = "lineHigh";//高亮显示当前行

        // 将所点歌词时间赋给播放时间
        music.currentTime = (this.currentLyric.lines[this.lineNo].time) / 1000
      },

      // 高亮歌词滚动事件
      lineHigh() {
        const ulist = this.$refs.ul
        const list = ulist.getElementsByTagName("li");
        if(this.lineNo>0){
          list[this.lineNo-1].removeAttribute("class");//去掉上一行的高亮样式
        }
        list[this.lineNo].className = "lineHigh";//高亮显示当前行
        //滚动至指定元素
        const element = document.getElementById(this.lineNo);
        // console.log('id',element,this.lineNo)
        element.scrollIntoView({behavior: "smooth", block: "center"});

        // 文字滚动 此方法已弃用
        /*if(this.lineNo > this.Cpos){
          ulist.style.transform = "translateY("+(this.lineNo-this.Cpos)*this.offset+"px)"; //整体向上滚动一行高度
        }*/
      },
      // 歌词重置
      goback() {
        const ulist = this.$refs.ul
        document.querySelector(".lineHigh").removeAttribute("class");
        ulist.style.transform = "translateY(0)";
        this.lineNo = 0; //lineNo清零，重新播放
      },
      back(){
        this.$router.go(-1);
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
    overflow: scroll;
    position: absolute;
    right: 0;
    left: 0;
    height: 230px;
  }
  ul{
    line-height: 32px;
    width: 100%;
    padding-bottom: 1rem
  }
  li{
    font-size: 16px;
    transition-duration: 1200ms;
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
  .author{
    color: #999;
    font-size: 12px;
  }
  .lineHigh{
    color: #ff0000;
    font-size: 20px;
  }
  div::-webkit-scrollbar {
    display: none;
  }
  /*.no-lyric {*/
  /*  color: #222222;*/
  /*  text-align: center;*/
  /*}*/

</style>
