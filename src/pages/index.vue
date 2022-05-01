<template>
  <div class="index">
    <el-container>
      <el-header class="index-header">
        <Header></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer class="index-footer">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from "../components/index/header"
  import Footer from "../components/index/footer"
  export default {
    name: "index",
    components:{
      Footer,
      Header
    }
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
    align-items: center;
    height: 50px;
    line-height: 40px;
    list-style: none;
    width: 100%;
  }
  .index ul li{
    flex: 1;
    text-align: center;
  }
  .index ul li a{
    font-size: 16px;
    color: #999;
  }

  .index-header{
    padding: 0;
    position: fixed;
    overflow: hidden;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .index-footer{
    height: 40px!important;
    overflow: hidden;
  }
</style>
<style>
  .el-main{
    padding: 10px;
    margin-top: 45px;
  }

  .footer .el-card__body{
    padding: 0;
  }

</style>
