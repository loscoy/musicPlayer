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
      <div class="hot">
        <hotSearch v-show="!searchListShow"></hotSearch>
        <searchList v-show="searchListShow" ref="searchList" :searchName="searchName" :searchList="newSearchList"></searchList>
      </div>
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
      return {
        searchName: "",
        searchList: [],
        newSearchList: [],
        searchDefault: "",
        newSearchDefault: "",
        musicInfo: [],
        searchListShow: false,
        limit: 40,
        Timer: null,
        TimerList: []
      };
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

    created(){
      // this.timer()
    },

    destroyed() {
      let that = this
      this.TimerList.forEach((item,index)=>{
        clearInterval(item)
      })
      this.TimerList = []
      this.Timer = 0;
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
        this.searchListShow = true
        this.$refs.autocomplete.suggestions = [];//收起搜索建议
        // 不输入则使用默认关键词
        if (searchName === '' || searchName === null){
          searchName = this.newSearchDefault
        }
        getSearchList(searchName,this.limit).then(res=>{
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
      hendleDefault () {
        this.newSearchDefault = this.searchDefault.split(" - ")[0];
      },

      // 定时获取默认关键词
      timer() {
        this.Timer = setInterval(()=>{
          clearInterval(this.timer)
          getSearchDefault().then(res=>{
            this.searchDefault = res.data.data.showKeyword
            this.hendleDefault()
            console.log(this.newSearchDefault);
          }); //调用获取实时数据的方法
        },5000)
        this.TimerList.push(this.Timer)
        return this.Timer
      },

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
  .hot{
    width: 100%;
    margin: 10px 10px 0 10px;
    text-align: center;
  }

</style>
