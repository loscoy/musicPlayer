<template>
  <div class="music-nav">
    <div class="log url hd">
      <h2>音乐榜单</h2>
      <div>更多</div>
    </div>
    <ul>
      <li>
        <router-link to="/home/digital">数字专辑榜</router-link>
        <span class="gap-line"></span>
      </li>
      <li>
        <router-link to="/home/news">新歌榜</router-link>
        <span class="gap-line"></span>
      </li>
      <li>
        <router-link to="/home/singer">歌手榜</router-link>
        <span class="gap-line"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "musicListNav"
  }
</script>

<style scoped>

  .music-nav{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 17px;
  }
  .hd{
    margin: 14px 0 18px 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .hd h2{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  .hd{
    margin-bottom: 0;
  }
  ul{
    display: flex;
  }
  ul li{
    padding: 18px 0 12px 0;
    font-size: 16px;
    flex: 1;
    text-align: center;
    color: #999;
    position: relative;
    z-index: 2;
  }
  ul li a{
    display: block;
  }
  ul li a.active{
    color: #299DE7;
  }
  .gap-line{
    position: absolute;
    right: 0;
    top: 20px;
    height: 18px;
    width: 1px;
    border-left: 1px solid #eee;
  }
  .hd div{
    width: 64px;
    font-size: 12px;
    text-align: right;
  }

</style>
