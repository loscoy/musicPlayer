<template>
  <div class="mod-albums">
    <div class="hd log url">
      <h2>今日推荐</h2>
      <div>更多</div>
    </div>

    <div class="container">
      <div class="gallery">
        <div class="scroller">
          <div class="card url" v-for="(item,index) in todayRecommend.slice(0, 6)" :key="index">
            <div class="album">
              <img :src="item.picUrl" alt="item.name">
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from '@/plugins/axios.js'

  export default {
    name: "TodayRecommend",
    data(){
      return{
        todayRecommend: []
      }
    },
    mounted(){
      var url = "/personalized/newsong"
      this.$axios.get(url).then(res=>{
        // console.log(res.data.result)
        this.todayRecommend = res.data.result
      },2000).catch(error =>{
        console.log(error)
      })

    },
    methods:{
      // getWangyi(){
      //   axios({
      //     url: '/playlist/hot',  /*热门歌单接口地址*/
      //     method: 'post'
      //   })
      //     .then(res => {
      //       console.log("数据：", res.data.tags)
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // }
    }
  }
</script>

<style scoped>

  .mod-albums{
    background-color: #fff;
    padding: 10px 17px;
  }
  .hd{
    display: flex;
    margin: 14px 0 18px 0;
  }
  .hd h2{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  .hd div{
    width: 64px;
    font-size: 12px;
    text-align: right;
  }
  .mod-albums .gallery{
    overflow: hidden;
    margin: 0 -5px;
  }
  .mod-albums .gallery .card{
    width: 33.3%;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px 10px;
  }
  .mod-albums .gallery .card .album{
    position: relative;
  }
  .mod-albums .gallery .card img{
    width: 100%;
    height: auto;
    border: 1px solid #eee;
  }
  .mod-albums .gallery .card .name{
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
    line-height: 14px;
    max-height: 28px;
    margin-bottom: 2px;
  }

</style>
