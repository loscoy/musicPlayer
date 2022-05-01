<template>
  <div class="hotSearch">
    <div class="title">
      热搜榜
    </div>
    <el-skeleton style="width:100%;text-align: center;padding-top: 5px;" :loading="loading" animated><!--:throttle="1000"-->
      <template slot="template">
        <div class="hotCard">
          <el-card :body-style="{ padding: '5px', marginBottom: '1px' }">
            <div
                    style="display: flex; align-items: center; justify-content: space-between;margin: 10px;height: 20px"
                    v-for="i in 10" :key="i"
            >
              <el-skeleton-item variant="text" style="margin:10px;width: 50%" />
              <el-skeleton-item variant="text" style="width: 50%;margin: 10px" />
            </div>
          </el-card>
        </div>
      </template>
      <template #default>
        <div class="hotCard">
          <el-card :body-style="{ padding: '5px', marginBottom: '1px' ,}">
            <div class="container">
              <div class="info" v-for="(item,index) in hotSearchData" @click="search(item.searchWord)" :key="index">
                <div class="text">
                  <div class="i">{{index+1}}</div>
                  <div class="w">{{item.searchWord}}</div>
                  <div class="image" v-if="item.iconUrl !== 0"><img :src="item.iconUrl"></div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
  import { getHotSearch } from "../Api/music";

  export default {
    name: "hotSearch",
    data () {
      return {
        hotSearchData: [],
        loading: false,
        limit: 40,
        searchInfo:[],
      };
    },
    props: {
    },
    mounted () {
      getHotSearch().then(res=>{
        this.loading = true
        this.hotSearchData = res.data.data
        setTimeout(() => (this.loading = false), 500);
      })
    },
    methods: {
      search (keyWord) {
        this.$parent.submitSearch(keyWord);
      },
    },
  };

</script>

<style scoped>

  .hotSearch{
    text-align: center;
    width: 100%;
  }
  .hotSearch .title{
    width: 100%;
    position: relative;
    text-align: left;
    height: 30px;
  }
  .container{
    position: relative;
    height: 300px;
    width: 100%;
  }
  .info{
    float: left;
    width: 50%;
    text-align: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px 10px;
  }
  .text{
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
    line-height: 14px;
    max-height: 28px;
    max-width: 100%;
    margin-bottom: 2px;
    display: flex;
  }
  .i{
    text-align: left;
    width: 30px;
    color: #999999;
  }
  .w{
    margin-right: 5px;
    max-width: 60%  ;
    overflow: hidden;
  }
  .image{
    align-items: center;
    max-width: 20%;
    overflow: hidden;
  }
  img {
    max-width:40%;
  }
 /*.container div:active{*/

 /*   background-color:black;*/

 /* }*/
  .el-card{
    border-radius: 10px;
  }
</style>

