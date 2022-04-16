<template>
  <div class="searchList">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>单曲</span>
        <el-button style="float: right; padding: 3px 0" type="text">播放</el-button>
      </div>
      <div v-for="(item,index) in searchList" :key="index" class="text item">
        <div class="name">{{item.name}}</div>
        <div class="artist">{{item.artist}}</div>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>

  import {getSearchList} from '../Api/music'

  export default {
    name: "searchList",
    props:{
      searchName:'',
      searchList:[],

    },
    data(){
      return{
      }
    },
    mounted() {
    },
    methods:{

    }
  }
</script>

<style scoped>
  .searchList{
    text-align: center;
    position: relative;
    width: 100%;
    display:flex;
    justify-content: center;
    margin-top: 10px;
  }
  .clearfix .text{
    font-size: 12px;
  }
  .item {
    margin-bottom: 18px;
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
    width: 95%;
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
</style>
