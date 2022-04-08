<template>
  <div class="index">
    <ul>
      <li>
        <router-link to="/">
          <img src="../assets/logo.png" height="30" width="30" alt="首页"/>
        </router-link>
      </li>
      <li>
        <router-link to="/artist">
         歌手
        </router-link>
      </li>
      <li>
        <router-link to="/topList">
         榜单
        </router-link>
      </li>
      <li>
        <router-link to="/ucenter">
          我的
        </router-link>
      </li>
      <li>
        <router-link to="/search">
          搜索
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

  .index img{
    width: 30px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .index ul{
    display: flex;
    height: 50px;
    line-height: 50px;
    background: #f9f9f9;
    list-style: none;
  }
  .index ul li{
    flex: 1;
    text-align: center;
  }
  .index ul li a{
    font-size: 16px;
    color: #999;
  }
</style>
