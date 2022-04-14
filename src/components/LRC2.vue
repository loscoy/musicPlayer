<template>
  <div class="lyric-box">
    <Scroll
      class="lyric"
      ref="lyricList"
      :data="currentLyric && currentLyric.lines"
    >
      <!--currentTime * 1000 >= currentLyric2.lines[index].time && currentTime * 1000 < currentLyric2.lines[index + 1].time ? 'active' : ''-->
      <div class="lyric-wrapper">
        <div v-if="currentLyric">
          <p
            ref="lyricLine"
            class="lyric-text"
            v-for="(item, index) in currentLyric.lines"
            :class="currentLyricNum === index ? 'active' : ''"
            :key="index"
            @click="clickLyricPlay(item)"
          >
            {{ item.txt }}
          </p>
        </div>
        <div class="no-lyric" v-else>暂无歌词,请搜索重试</div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from './Scroll/Scroll'
  import Lyric from 'lyric-parser'
  import {getLyric} from "../lrcApi/lrc";

  export default {
    name: 'LRC2',
    data() {
      return {
        lyric: '',
        lyric2: '',
        newLrcData:[],
        timeArr:[],
        lrcArr:[],
        currentLyric:{},
        currentLyric2:{},
        currentLyricNum:0,
        playingLyric:'',
        isPureMusic: true,
        canLyricPlay:true,
        offset:0,
        url : "/lyric?id=" + this.lrcId
      }
    },
    props: {
      // currentLyricNum: {
      //   type: Number
      // },
      // currentLyric: {
      //   type: Object
      // },
      lrcId:{
        type:Number,
      },
      currentTime:{
        type:Number
      },
      durationTime:{
        type:Number
      },
      progress:{
        type:Number,
        default:0
      }
    },
    components: {
      Scroll
    },
    created() {
      this.getLyric(this.url)
    },
    mounted() {

    },
    methods: {
      // 异步获取歌词
      async getLyric(url) {
        try {
          let res = await getLyric(url)
          this.lyric = res.data.lrc.lyric
          this.lyric2 = res.data.lrc.lyric
          this.currentLyric = new Lyric(this.lyric, this.lyricHandle)
          this.currentLyric2 = new Lyric(this.lyric2, this.lyricHandle)
          console.log(this.currentLyric2)
          // 判断歌曲是否准备好进行播放
          if (this.isPureMusic) {
            // 使用正则表达式处理，然后返回playingLyric，这就是处理之后的歌词
            this.playingLyric = this.currentLyric.lrc.replace(
              /\[(\d{2}):(\d{2}):(\d{2})\]/g,
              ''
            )
          } else {
            if (this.playing && this.canLyricPlay) {
              this.currentLyric.seek(this.currentTime * 1000)
            }
          }
        } catch (error) {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLyricNum = 0
        }
      },
      // 选中某一行播放
      clickLyricPlay() {

      },
      // 歌词的回调以及歌词在某一个位子固定
      lyricHandle({ lineNum, txt }) {
        //判断组件实例对象是否存在
        console.log(lineNum,txt)
        if (!this.$refs.lyricRef.$refs.lyricList) {
          return
        }
        // 歌词的行数
        this.currentLyricNum = lineNum
        // 返回的歌词
        this.playingLyric = txt
        // 判断当前歌词行数是否大于2，其实是第3行，然后当歌词滚动到第3行之后不再向下滚动，也是实现歌词高亮的一种效果，就是操作虚拟dom来实现的，
        // 这里为什么是有两个$refs,是由于这个是涉及到三个组件之间的dom。//如果行数大于3，向上移动一个div
        if (lineNum > 5) {
          let line = this.$refs.lyricRef.$refs.lyricLine[lineNum - 5]
          if (this.$refs.lyricRef.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricRef.$refs.lyricList.scrollToElement(line, 1000)
            })
          }
        } else {
          if (this.$refs.lyricRef.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricRef.$refs.lyricList.scrollTo(0, 0, 1000)
            })
          }
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .lyric-box {
    .lyric {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 240px;
      overflow: hidden;
      .lyric-wrapper {
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        .lyric-text {
          line-height: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 6px 2px;
          font-size: 15px;
          font-weight: 500;
          color: #999999;
          cursor: pointer;
          text-align: center;
          &:hover {
            background: #f9f9f9;
            color: #999999;
          }
          &.active {
            color: #ff0000;
            font-size: 25px;
          }
          &::after {
            color: #555555;
          }
        }
        .no-lyric {
          color: #222222;
          text-align: center;
        }
      }
    }
  }
</style>
