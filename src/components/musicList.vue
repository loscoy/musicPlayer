<template>
  <div class="border panels">
    <div class="panel hotsongs on">
      <ul class="list">

        <div v-if="url==='/album/list?limit=6'" v-for="(item,index) in currentData" :key="index">
          <router-link to="/musicplay2" custom v-slot="{navigate}">
            <div @click="navigate" role="link">
              <li  class="song url">
                <span class="range">{{index+1}}</span>
                  <div class="poster">
                    <img :src="item.coverUrl" :alt="item.albumName">
                  </div>
                  <div class="info">
                    <div class="name">
                      {{item.albumName}}
                    </div>
                    <div class="author">
                      {{item.artistName}}
                    </div>
                  </div>
              </li>
            </div>
          </router-link>
        </div>

        <div v-if="url==='/album/newest'"  v-for="(item,index) in currentData.slice(0,6)" :key="index">
          <router-link :to="{name:'musicPlay2',query:{musicId:item.id,musicName:item.name,musicArtist:item.artists.name,musicPic:item.picUrl}}" custom v-slot="{navigate}">
            <div @click="navigate" role="link">
              <li class="song url">
                <span class="range">{{index+1}}</span>
                <div class="poster">
                  <img :src="item.picUrl" alt="picId">
                </div>
                <div class="info">
                  <div class="name">
                    {{item.name}}
                  </div>
                  <div class="author">
                    {{item.artist.name}}
                  </div>
                </div>
              </li>
            </div>
          </router-link>
        </div>

        <div v-if="url==='/top/artists?offset=0&limit=30'">
          <li class="song url"  v-for="(item,index) in currentData" v-if="index < 6" :key="index">
            <span class="range">{{index+1}}</span>
            <div class="poster">
              <img :src="item.picUrl" alt="picId">
            </div>
            <div class="info">
              <div class="name">
                {{item.name}}
              </div>
              <div class="author">
                {{item.alias[0]}}
              </div>
            </div>
          </li>
        </div>

      </ul>
      <div class="more-songs url">
        查看该榜单
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "../plugins/axios";

  export default {
    name: "musicList", //音乐榜单组件
    data(){
      return{
        currentData:[]
      }
    },
    props:{
      url:{
        type:String,
        default:''
      }
    },
    mounted() {
      const url = this.url;
      if(url === "/album/list?limit=6"){
        axios.get(url).then(res=>{
          // console.log(res.data.products)
          this.currentData = res.data.products
        },2000).catch(error =>{
          console.log(error)
        })
      }
      if(url === "/album/newest"){
        axios.get(url).then(res=>{
          // console.log('albums',res.data.albums)
          this.currentData = res.data.albums
        },2000).catch(error =>{
          console.log(error)
        })
      }
      if(url === "/top/artists?offset=0&limit=30"){
        axios.get(url).then(res=>{
          // console.log(res.data.artists)
          this.currentData = res.data.artists
        },2000).catch(error =>{
          console.log(error)
        })
      }

    },
  }
</script>

<style scoped>

  .panel{
    border-top: 1px solid #eee;
    position: relative;
    top:-1px;
    display: block;
    background: #fff;
  }
  .list{
    padding: 20px;
    padding-top: 0;
  }
  .panel .list li{
    height: 60px;
    border-bottom: 1px solid #eee;
    padding-left: 0;
    display: flex;
    padding-top: 10px;
  }
  .panel .list li .poster{
    position:relative;
    width: 45px;
    margin-right: 8px;
  }
  .panel .list li .poster img{
    border: 1px solid #eee;
    border-radius: 15px;
  }
  .info{
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }
  .info .author{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }
  .more-songs{
    color: #999;
    margin-top: 9px;
    font-size: 12px;
    text-align: center;
    height: 32px;
    line-height: 32px;
  }
  .range{
    padding-right: 5px;
  }

</style>
