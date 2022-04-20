<template>
  <!--  今日推荐 - 更多-->
  <div class="more-list" v-if="this.$route.query.url === '/personalized/newsong'">
    <div class="wrapper">
      <vue-pull-refresh :on-refresh="onRefresh">
        <h3>{{this.$route.query.title}}</h3>
        <div class="info url log" v-for="(item,index) in morelist" :key="index">
          <router-link :to="{name:'musicPlay2',query:{musicId:item.id}}" custom v-slot="{navigate}">
            <div @click="navigate" role="link">
              <div class="poster">
                <div class="img">
                  <img :src="item.picUrl" :alt="item.name">
                </div>
              </div>
              <div class="text-wrap">
                <div class="name">{{item.name}}</div>
                <div class="author">{{item.song.artists[0].name}}</div>
              </div>
            </div>
          </router-link>
        </div>
      </vue-pull-refresh>
    </div>
  </div>
  <!--  热门歌单 - 更多-->
  <div class="more-list" v-else-if="this.$route.query.url === '/artists?id=6452'">
    <div class="wrapper">
      <vue-pull-refresh :on-refresh="onRefresh">
        <h3>{{this.$route.query.title}}</h3>
        <div class="info url log" v-for="(item,index) in morelist" :key="index">
          <router-link :to="{name:'musicPlay2',query:{musicId:item.id}}" custom v-slot="{navigate}">
            <div @click="navigate" role="link">
              <div class="poster">
                <div class="img">
                  <img :src="item.al.picUrl" :alt="item.name">
                </div>
              </div>
              <div class="text-wrap">
                <div class="name">{{item.name}}</div>
              </div>
            </div>
          </router-link>
        </div>
      </vue-pull-refresh>
    </div>
  </div>
  <!--  新歌速递 - 更多-->
  <div class="more-list" v-else-if="this.$route.query.url === '/album/newest'">
    <div class="wrapper">
      <vue-pull-refresh :on-refresh="onRefresh">
        <h3>{{this.$route.query.title}}</h3>
        <div class="info url log" v-for="(item,index) in morelist" :key="index">
          <router-link :to="{name:'musicPlay2',query:{musicId:item.id}}" custom v-slot="{navigate}">
            <div @click="navigate" role="link">
              <div class="poster">
                <div class="img">
                 <img :src="item.picUrl" :alt="item.name">
                </div>
              </div>
              <div class="text-wrap">
                <div class="name">{{item.name}}</div>
                <div class="author">{{item.artist.name}}</div>
              </div>
            </div>
          </router-link>
        </div>
      </vue-pull-refresh>
    </div>
  </div>
</template>

<script>
  import axios from "../plugins/axios";
  import vuepullrefresh from "vue-pull-refresh"

  export default {
    name: "moreList",//更多列表组件（热门歌单，今日推荐）
    data(){
      return{
        morelist:[],
        offset: 10,
      }
    },
    components: {
      'vue-pull-refresh': vuepullrefresh
    },
    mounted(){
      if(this.$route.query.url === "/personalized/newsong"){
        axios.get(this.$route.query.url).then(res=>{
          // console.log("1",res.data.result[0].song.artists[0].name)
          this.morelist = res.data.result
        },2000).catch(error =>{
          console.log(error)
        })
      }
      if (this.$route.query.url === "/artists?id=6452"){
        axios.get(this.$route.query.url).then(res=>{
          this.morelist = res.data.hotSongs
          //过滤空项
          this.morelist.forEach((item,index) => {
            if (!item.al.picUrl) {
              this.morelist.splice(index,1)
            }
          })
          this.morelist = this.morelist.slice(0,10)
          // console.log("list",this.morelist)
        },2000).catch(error =>{
          console.log(error)
        })
      }
      if (this.$route.query.url === "/album/newest"){
        axios.get(this.$route.query.url).then(res=>{
          this.morelist = res.data.albums
          this.morelist = this.morelist.slice(0,10)
          // console.log("list",this.morelist)
        },2000).catch(error =>{
          console.log(error)
        })
      }
      console.log("api",this.$route.query.url)
    },
    methods:{
      onRefresh() {
        const that = this
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            if(that.$route.query.url === "/personalized/newsong"){
              axios.get(that.$route.query.url).then(res=>{
                console.log("1",res.data)
                that.morelist = res.data.result;
                that.morelist = that.morelist
              },2000).catch(error =>{
                console.log(error)
              })
            }
            if (that.$route.query.url === "/artists?id=6452"){
              axios.get(that.$route.query.url).then(res=>{
                //过滤空项
                that.morelist = res.data.hotSongs
                that.morelist.forEach((item,index) => {
                  if (!item.al.picUrl) {
                    that.morelist.splice(index,1)
                  }
                })
                that.morelist = that.morelist.slice(that.offset,that.offset + 10)
                // console.log("2",that.offset,that.offset+10)
                that.offset + 10 < res.data.hotSongs.length ? that.offset += 10 : console.log("无更多数据")

                //数据迭代
                // that.morelist = that.morelist.slice(that.offset,that.offset + 10)
                // that.offset + 10 < res.data.hotSongs.length ? that.offset += 10 : console.log("无更多数据")
                //数据累加
                // that.morelist = res.data.hotSongs.slice(0,that.offset)
                // that.morelist.length < 50 ? that.offset += 10 : console.log("无更多数据")
              },2000).catch(error =>{
                console.log(error)
              })
            }
            if (that.$route.query.url === "/album/newest"){
              axios.get(that.$route.query.url).then(res=>{
                that.morelist = res.data.albums
                that.morelist = that.morelist
              },2000).catch(error =>{
                console.log(error)
              })
            }
            resolve()
          }, 1000);
        });
      }
    },

  }
</script>

<style scoped>

  .wrapper{
    padding-top: 13px;
    text-align: center;
    margin-top: 10px;
    background: #fff;
    clear: both;
    overflow: hidden;
  }
  h3{
    font-size: 22px;
    text-align: left;
    margin-left: 17px;
    margin-bottom: 5px;
  }
  .wrapper .info{
    width: 42%;
    float: left;
    padding-left: 17px;
    display: block;
    text-align: left;
    margin-bottom: 10px;
    position: relative;
  }
  .img{
    position:relative;
    width:100%;
    height:0;
    padding-top: 100%;
    margin-bottom: 5px;
  }
  img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 15px;
  }
  .name{
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 14px;
    max-height: 28px;
    margin-top: 5px;
    margin-bottom: 2px;
  }
  .author{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999;
    font-size: 12px;
    line-height: 12px;
  }

</style>
