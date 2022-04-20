<template>
  <div class="mod-albums">
    <el-skeleton animated :loading="loading">
      <template #template>
        <div style="display: flex;flex-wrap: wrap;justify-content: center;width: 100%">
          <div style="width: 95%;margin-top: 10px">
            <el-skeleton-item style="width: 30%;float: left;height: 20px"></el-skeleton-item>
            <el-skeleton-item style="width: 20%;float: right;height: 20px"></el-skeleton-item>
            <div style="width:100%;display: flex;flex-wrap: wrap">
              <div style="width: 33%;" v-for="i in 6" :key="i">
                <el-skeleton-item variant="image" style="height: 100px;margin:10px;border-radius: 10px"></el-skeleton-item>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template>
        <div class="hd log url">
          <h2>新歌速递</h2>
          <router-link :to="{name:'moreList',query:{title:'新歌速递',url:'/album/newest'}}" v-slot="{navigate}">
            <div @click="navigate" role="link">
              更多
            </div>
          </router-link>
        </div>
        <div class="container">
          <div class="gallery">
            <div class="scroller">
              <div class="card url" v-for="(item,index) in NewsMusic.slice(0,3)" :key="index">
                <router-link :to="{name:'musicPlay2',query: {musicId:item.id}}" custom v-slot="{navigate}">
                  <div class="album" @click="navigate" role="link">
                    <img :src="item.picUrl" alt="item.name">
                    <div class="name">{{item.name}}</div>
                    <div class="author">{{item.artist.name}}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
  import axios from '../plugins/axios.js'

  export default {
    name: "NewsMusic",
    data(){
      return{
        NewsMusic: [],
        loading:false
      }
    },
    mounted(){
      this.loading = true
      const url = "/album/newest";
      axios.get(url).then(res=>{
        // console.log('new',res.data.albums)
        this.NewsMusic = res.data.albums
        setTimeout(() => {
          this.loading = false;
        },1000);
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
      //       console.log("我拿到的数据：", res.data.tags)
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
    margin-top: 10px;
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
    border-radius: 15px;
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
  .mod-albums .gallery .card .author{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
    font-size: 12px;
    line-height: 12px;
  }

</style>
