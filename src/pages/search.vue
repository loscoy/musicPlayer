<template>
  <div class="search">
    <el-autocomplete
      prefix-icon="el-icon-search"
      class="searchInput"
      v-model="searchName"
      :trigger-on-focus="false"
      :fetch-suggestions="queryS"
      @select="goToSelected"
      :placeholder="searchDefault"
      @keypress.native.enter="submitSearch(searchName)"
    >
      <el-button slot="append" @click="submitSearch(searchName)" icon="el-icon-search"></el-button>
    </el-autocomplete>
    <div class="container">
      <hotSearch v-show="!searchListShow"></hotSearch>
      <searchList v-show="searchListShow" ref="searchList" :searchName="searchName" :searchList="newSearchList"></searchList>
    </div>
  </div>
</template>

<script>
  import {getSearchDefault,getSearchList,getDetailInfo} from '../Api/music.js'
  import hotSearch from "../components/hotSearch";
  import searchList from "../components/searchList";

  export default {
    name: "search",
    data(){
      return{
        searchName:'',
        searchList:[],
        newSearchList:[],
        searchDefault:'',
        newSearchDefault:'',
        musicInfo:[],
        searchListShow:false,
        limit:40
      }
    },
    components:{
      hotSearch,
      searchList
    },
    mounted() {
      getSearchDefault().then(res=>{
        this.searchDefault = res.data.data.showKeyword
      });
    },
    methods:{
      queryS(queryString,cb){
        if (queryString){
          getSearchList(queryString,this.limit).then(res=>{
            setTimeout(()=>{
              this.searchList = res.data.result.songs
              cb(this.getSearchList())
            },1000)
          })
        }
      },
      getSearchList(){
        let arr = new Array(0)
        this.searchList.forEach(item=>{
          if(item.artists[1]){
            arr.push({
              id:item.id,
              value:item.name + ' - ' + item.artists[0].name + ' / ' + item.artists[1].name,
            })
          }else{
            arr.push({
              id:item.id,
              value:item.name + ' - ' + item.artists[0].name,
            })
          }
        })
        return arr
      },
      goToSelected(item){
        getDetailInfo(item.id).then(res=>{
          this.musicInfo = res.data.songs[0]
          this.$router.push({path:"/musicPlay2",query: {musicId:item.id,musicName:this.musicInfo.name,musicPic:this.musicInfo.al.picUrl}})
        })
      },
      submitSearch(searchName){
        this.searchListShow = true
        this.hendleDefault()  //处理默认关键词
        // 不输入则使用默认关键词
        if (searchName === '' || searchName === null){
          this.searchName = this.newSearchDefault
        }
        getSearchList(this.searchName,this.limit).then(res=>{
          let searchList = res.data.result.songs
          searchList.forEach(item=>{
            //多个歌手处理方式
            if (item.artists.length > 1){
              // console.log(item);
              let l = item.artists.length
              let s = ''
              this.newSearchList.push({
                id:item.id,
                name:item.name,
                artist: ''
              })
              for(let i=0;i<l;i++){
                if (i+1 !== l){
                  s = s.concat(item.artists[i].name).concat(' / ')
                }else{
                  s = s.concat(item.artists[i].name)
                }
              }
              // console.log(s);
              this.newSearchList.artist = s
            }else if (item.artists.length === 1){
              this.newSearchList.push({
                id:item.id,
                name:item.name,
                artist: item.artists[0].name
              })
            }
          })
        })
      },
      hendleDefault(){
        this.newSearchDefault = this.searchDefault.split(" - ")[0]
      }
    }
  }
</script>

<style scoped>

  .search{
    width: 100%;
    position: relative;
    text-align: center;
  }
  .searchInput{
    width: 95%;
    margin: 10px 10px 0 10px;
    text-align: center;
  }


</style>
