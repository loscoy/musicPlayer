<template>

  <div class="lrcForm" >
    <div class="lrc" ref="lrc">
      <p
        :class="currentTime >= timeArr[index] - 1 && currentTime < timeArr[index+1] - 1 ? 'active' : ''"
        v-show="currentTime >= timeArr[index] - 1 && currentTime < timeArr[index+1] - 1"
        v-for="(item,index) in newLrcData" :key="index"
      >
        {{item}}
      </p>
    </div>
  </div>

</template>

<script>

  import Lyric from 'lyric-parser'
  import axios from "@/plugins/axios"

  export default {
    name: "LRC",
    data(){
      return{
        lrcData: '',
        newLrcData:[],
        timeArr:[]
      }
    },
    props:{
      lrcId:{
        type:Number,
      },
      currentTime:{
        type:Number
      },
      durationTime:{
        type:Number
      }
    },
    mounted() {
      const url = "/lyric?id=" + this.lrcId
      axios.get(url).then(res => {
        this.lrcData = res.data.lrc.lyric
        this.lyricFormat(this.lrcData)
        // console.log(this.timeArr)
      },2000).catch(error =>{
      console.log(error)
      })
    },
    methods:{
      // 歌词处理
      lyricFormat(lrcData){
        let arr = lrcData.split("\n") //根据换行符切割
        let row = arr.length  //确定歌词行数
        // console.log(row)
        for(let i = 0;i < row;i ++){
          let tempRow = arr[i]  //将切割好的歌词依次放入数组
          let tempArr = tempRow.split("]")  //分离时间和歌词
          let lrcData = tempArr.pop() //分离后的歌词放入lrcData
          tempArr.forEach(item=>{
            let arr1 = []
            let arr2 = []
            let timeArr = item.substr(1,item.length - 1).split(":") //提取数字
            let s = parseInt(timeArr[0]) * 60 + Math.ceil(timeArr[1]) //转换类型
            arr1 = lrcData
            arr2 = s
            this.newLrcData.push(arr1)
            this.timeArr.push(arr2)
          })
        }
      },
    }
  }
</script>

<style scoped>

  .lrcForm{
    position: absolute;
    height: 250px;
    width: 90%;
    /*overflow: scroll;*/
  }
  .lrc{
    overflow: hidden;
    position: relative;
  }
  .active{
    color: pink;
    font-size: 20px;
  }
</style>
