<template>
  <div class="searchList">
    <el-card class="box-card" :body-style="{'height':showall}">
      <div slot="header" class="clearfix">
        <span>单曲</span>
      </div>
      <el-skeleton style="width:100%;text-align: center;padding-top: 5px;" :loading="loading" animated>
        <template #template>
          <div
                  style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;"
                  v-for="i in 10" :key="i"
          >
            <el-skeleton-item variant="text" style="width: 30%" />
            <el-skeleton-item variant="text" style="width: 20%;margin-top: 2px" />
            <el-divider></el-divider>
          </div>
        </template>

        <template #default>
          <div class="temp">
            <div>
              <div v-for="(item,index) in newSearchList" @click="goToSelected(item.id)" :key="index" class="text item">
                <div class="name">{{item.name}}</div>
                <div class="artist">{{item.artist}}</div>
                <div></div>
                <el-divider></el-divider>
              </div>
              <div style="font-size: 14px">无更多数据</div>
            </div>
            <div class="showMore" v-if="showall==='470px'" @click="showAll">
              <el-card body-style="padding:0;width:100%">查看更多</el-card>
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script>

  import { getDetailInfo } from "../Api/music";

  export default {
    name: "searchList",
    data(){
      return{
        newSearchList:this.searchList,
        musicInfo:[],
        artistName:'',
        loading:false,
        showall:'470px'
      }
    },
    props:{
      searchName:'',
      searchList:[],
    },
    watch:{
      // 监听父组件传值变化
      searchList(val){
        this.newSearchList = val;
        setTimeout(()=>(this.loading = false),500)
      },
    },
    computed: {

    },
    mounted() {
      this.loading = true
    },
    methods: {
      goToSelected (index) {
          this.$router.push({
            path: "/musicPlay2",
            query: {
              musicId: index,
            },
          });
      },
      showAll () {
        this.showall = '100%'
      },
    },
  }
</script>

<style scoped>
  .searchList{
    text-align: center;
    position: relative;
    width: 95%;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }
  .item {
    margin-bottom: 18px;
    text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 100%;
    text-align: left;
  }
  .artist{
    position: relative;
    font-size: 5px;
    color: #999999;
  }
  .el-divider--horizontal{
    margin: 8px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
  }
  .clearfix span{
    font-weight: bolder;
  }
  .showMore{
    position: absolute;
    top: 560px;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
  }
</style>
