<template>
  <div class="login">
    <el-input class="input" v-model="phone" placeholder="手机号码"></el-input>
    <el-input class="input" v-model="password" type="password" placeholder="密码"></el-input>
    <el-button @click="submitLogin(phone,password)">登录</el-button>
    <el-button @click="logout">退出</el-button>
    <el-link type="info">
      <router-link to="/home">
        暂不登录
      </router-link>
    </el-link>
  </div>
</template>

<script>
  import { login, logOut } from "../../Api/user";
  import { mapActions, mapState } from "vuex";
  export default {
    name: "login",
    data () {
      return {
        phone: "",
        password: "",
      };
    },
    computed :{
      ...mapState({token:state => state.user.token}),
    },
    mounted () {
      console.log(this.token);
    },
    methods:{
      ...mapActions(['setToken','clearToken']),
      submitLogin (phone, password) {
        let that = this
        if (phone === "" || password === "") {
          this.$message({
            type: "warning",
            message: "用户名或密码为空！",
          });
        } else if (this.token) {
          this.$message({
            type: "warning",
            message: "请勿重复登录！",
          });
          this.$router.push("/home");
        } else {
          login(phone, password).then(res => {
            if (res.data.code === 200) {

              sessionStorage.clear();
              sessionStorage.setItem("userid", res.data.profile.userId);
              sessionStorage["token"] = res.data.token;
              // this.$store.dispatch('setToken',{token: res.data.token, id: res.data.profile.userId})
              that.setToken('setToken',{token: res.data.token, id: res.data.profile.userId}) //同上写法
              this.$router.push("/home");
              this.$message({
                type: "success",
                message: "登录成功！",
              });
            } else {
              this.$message({
                type: "warning",
                message: '错误' + res.data.msg,
              });
            }
            console.log(res.data);
          }).catch(error => {
            console.log(error);
          });
        }
      },
      logout () {
        let that = this
        if (this.token !== null) {
          logOut().then(res => {
            console.log(res);
          });
          sessionStorage.clear();
          that.clearToken("clearToken");
        } else {
          this.$message("未登录");
        }
      },
    },
  };
</script>

<style scoped>

</style>
