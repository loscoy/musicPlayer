<template>
  <div class="lrcForm">
    <div class="lrc" ref="lrc">
      <p :class="currentTime >= timeArr[index] - 1 && currentTime < timeArr[index + 1] - 1 ? 'active' : ''"
        v-show="currentTime >= timeArr[index] - 1 && currentTime < timeArr[index + 1] - 1"
        v-for="(item, index) in newLrcData" :key="index">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>

import Lyric from 'lyric-parser'
import axios from "@/plugins/axios"
import { mapState } from 'vuex'

export default {
  name: "LRC",
  data () {
    return {
      lrcData: '',
      newLrcData: [],
      timeArr: [],
      currentTime: 0,
      durationTime: 0,
    }
  },
  watch: {
    currentIndex (val, oval) {
      this.lrcInit()
    },
  },
  computed: {
    ...mapState({
      currentIndex: (state) => state.song.currentIndex,
      songIdList: (state) => state.song.songIdList,
      musicPlayShow: (state) => state.musicPlayShow
    }),
    musicId () {
      return this.songIdList[this.currentIndex]
    }
  },
  mounted () {
    if (this.musicId) {
      this.lrcInit()
    }
    this.addEventListeners();
  },
  beforeDestroyed () {
    this.removeEventListeners();
  },
  methods: {
    lrcInit () {
      const url = "/lyric?id=" + this.musicId
      axios.get(url).then(res => {
        this.lrcData = res.data.lrc.lyric
        this.lyricFormat(this.lrcData)
      }).catch(error => {
        console.log(error)
      })
    },
    // 歌词处理
    lyricFormat (lrcData) {
      this.newLrcData = []
      this.timeArr = []
      let arr = lrcData.split("\n") //根据换行符切割
      let row = arr.length  //确定歌词行数
      // console.log(row)
      for (let i = 0; i < row; i++) {
        let tempRow = arr[i]  //将切割好的歌词依次放入数组
        let tempArr = tempRow.split("]")  //分离时间和歌词
        let lrcData = tempArr.pop() //分离后的歌词放入lrcData
        tempArr.forEach(item => {
          let arr1 = []
          let arr2 = []
          let timeArr = item.substr(1, item.length - 1).split(":") //提取数字
          let s = parseInt(timeArr[0]) * 60 + Math.ceil(timeArr[1]) //转换类型
          arr1 = lrcData
          arr2 = s
          this.newLrcData.push(arr1)
          this.timeArr.push(arr2)
        })
      }
    },

    addEventListeners () {
      const player = document.getElementById("player")
      player.addEventListener('timeupdate', this._currentTime)
      player.addEventListener('canplay', this._durationTime)
    },
    removeEventListeners () {
      const player = document.getElementById("player")
      player.removeEventListener('timeupdate', this._currentTime)
      player.removeEventListener('canplay', this._durationTime)
    },
    _currentTime () {
      this.currentTime = document.getElementById("player").currentTime
      // currentTime是audio标签提供的获取当前播放时间的方法
    },
    _durationTime () {
      this.durationTime = document.getElementById("player").duration
      // duration是audio标签提供的获得歌曲播放整体时间的方法
    }
  }
}
</script>

<style scoped>
.lrcForm {
  /* position: absolute; */
  height: auto;
  width: 100%;
  /*overflow: scroll;*/
}

.lrc {
  overflow: hidden;
  position: relative;
}

.active {
  color: pink;
  font-size: 15px;
}
</style>
