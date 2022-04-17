<template>
  <div class="search">
    <el-autocomplete
      ref="autocomplete"
      prefix-icon="el-icon-search"
      class="searchInput"
      v-model="searchName"
      :trigger-on-focus="true"
      :fetch-suggestions="queryS"
      @select="goToSelected"
      :debounce=10
      :placeholder="searchDefault"
      @keypress.enter.native="submitSearch(searchName)"
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
        this.hendleDefault()
      });
    },
    methods:{
      queryS(queryString,cb){
        if (queryString) {
          getSearchList(queryString, this.limit).then(res => {
              this.searchList = res.data.result.songs
              cb(this.getSearchList())
          })
        }
      },
      getSearchList(){
        let arr = new Array(0)
        this.searchList.forEach((item,index)=>{
          if (item.artists.length > 1){
            // console.log(item);
            let l = item.artists.length
            let s = ''
            arr.push({
              id:item.id,
              value: '',
              artist:''
            })
            for(let i=0;i<l;i++){
              if (i+1 < l){
                s = s.concat(item.artists[i].name + ' / ')
              }else{
                s = s.concat(item.artists[i].name)
              }
            }
            arr[index]["value"] = item.name + ' - ' + s
            arr[index]["artist"] = s
          }else{
            arr.push({
              id:item.id,
              value:item.name + ' - ' + item.artists[0].name,
              artist:item.artists[0].name
            })
          }
        })
        return arr
      },
      goToSelected(item){
        getDetailInfo(item.id).then(res=>{
          this.musicInfo = res.data.songs[0]
          console.log(item);
          this.$router.push({path:"/musicPlay2",query: {musicId:item.id,musicArtist:item.artist,musicName:this.musicInfo.name,musicPic:this.musicInfo.al.picUrl}})
        })
      },
      submitSearch(searchName){
        this.searchListShow = true //收起搜索建议
        this.$refs.autocomplete.suggestions = [];
        // 不输入则使用默认关键词
        if (searchName === '' || searchName === null){
          this.searchName = this.newSearchDefault
        }
        getSearchList(this.searchName,this.limit).then(res=>{
          let searchList = res.data.result.songs
          // console.log(searchList);
          this.newSearchList = []
          searchList.forEach((item,index)=>{
            //多个歌手处理方式
            if (item.artists.length > 1){
              // console.log(item);
              let l = item.artists.length
              let s = ''
              this.newSearchList.push({
                id:item.id,
                name:item.name,
                artist: '',
              })
              for(let i=0;i<l;i++){
                if (i+1 < l){
                  s = s.concat(item.artists[i].name + ' / ')
                }else{
                  s = s.concat(item.artists[i].name)
                }
              }
              this.newSearchList[index]["artist"] = s
            }else if (item.artists.length === 1){
              this.newSearchList.push({
                id:item.id,
                name:item.name,
                artist: item.artists[0].name,
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
