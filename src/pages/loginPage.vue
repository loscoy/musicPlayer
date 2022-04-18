<template>
  <div class="login">
    <el-tabs type="card" tab-click stretch class="card">
      <el-tab-pane><router-link slot="label" to="login"><div style="width: 100%">登录</div></router-link></el-tab-pane>
      <el-tab-pane><router-link slot="label" to="register"><div>注册</div></router-link></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "login",

  };
</script>

<style scoped>
  .login{
    margin: 20px;
  }
</style>
