<template>
  <div class="playListNav">
    <el-menu :default-active="'1'" router class="playListNav" mode="horizontal"  style="border-radius:10px;text-align:center;width: 100%;margin: 10px 0;">
      <el-menu-item class="item" :index="item.id" v-for="item in routeInfo" :key="item.id" :route="{path:item.url}" style="width: 50%;">{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "playListNav",
    data () {
      return {
        routeInfo:[
          {id:'1',name:'创建歌单',url:'/ucenter/created'},
          {id:'2',name:'收藏歌单',url:'/ucenter/collect'}
        ],
        }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped>
  .item{
    float: left;
    height: 60px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
  }
</style>
