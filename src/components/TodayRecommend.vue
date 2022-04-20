<template>

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

    <template >
      <div class="mod-albums" v-if="this.url === '/personalized/newsong'">
        <div class="hd log url">
          <h2>{{title}}</h2>
          <router-link :to="{ name:'moreList', query:{ url:url,title:title}}" custom v-slot="{ navigate }">
            <div @click="navigate" role="link">更多</div>
          </router-link>
        </div>
        <div class="container">
          <div class="gallery">
            <div class="scroller">
                <div class="card url" v-for="(item,index) in todayRecommend.slice(0, 6)" :key="index">
                  <router-link :to="{name:'musicPlay2',query:{musicId:item.id}}" custom v-slot="{navigate}">
                    <div class="album" @click="navigate" @keypress.enter="navigate" role="link">
                      <div class="img">
                        <img :src="item.picUrl" :alt="item.name">
                      </div>
                      <div class="name">{{item.name}}</div>
                    </div>
                  </router-link>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mod-albums" v-else-if="this.url === '/artists?id=6452'">
        <div class="hd log url" >
          <h2>{{title}}</h2>
          <router-link :to="{name:'moreList',query:{url:url,title:title}}" custom v-slot="{ navigate }">
            <div @click="navigate" role="link">更多</div>
          </router-link>
        </div>
        <div class="container">
          <div class="gallery">
            <div class="scroller">
              <div class="card url" v-for="(item,index) in todayRecommend" v-if="item.al.picUrl !== null && index <= 6" :key="index">
                <router-link :to="{name:'musicPlay2',query:{musicId:item.id}}" custom v-slot="{navigate}">
                  <div class="album" @click="navigate" @keypress.enter="navigate" role="link">
                    <div class="img">
                      <img :src="item.al.picUrl" :alt="item.name">
                    </div>
                    <div class="name">{{item.name}}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
  import axios from '../plugins/axios.js'

  export default {
    name: "TodayRecommend",
    data(){
      return{
        todayRecommend: [],
        loading:false
      }
    },
    props:{
      title:{
        type:String,
        default:"今日推荐"
      },
      url:{
        type:String,
        default: "/personalized/newsong"
      }
    },
    mounted(){
      this.loading = true
      if(this.url === "/personalized/newsong"){
        axios.get(this.url).then(res=>{
          this.todayRecommend = res.data.result

        },2000).catch(error =>{
          console.log(error)
        })
      }
      if (this.url === "/artists?id=6452"){
        axios.get(this.url).then(res=>{
          this.todayRecommend = res.data.hotSongs
        },2000).catch(error =>{
          console.log(error)
        })
      }
      setTimeout(() => {
        this.loading = false;
      },1000);
    },
    computed: {

    },
    methods:{

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
  .img{
    position:relative;
    width:100%;
    height:0;
    padding-top: 100%;
  }
  .mod-albums .gallery .card img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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

</style>
