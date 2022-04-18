<template>
  <div class="login">
    <el-input v-model="phone" placeholder="手机号码"></el-input>
    <el-input v-model="password" placeholder="密码"></el-input>
    <el-button @click="submitLogin(phone,password)">登录</el-button>
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
  import { loginStatus, login, logOut } from "../../Api/user";
  export default {
    name: "login",
    data () {
      return {
        phone: "",
        password: "",
        user:[],
        status:[],
        token:sessionStorage.getItem('token')
      };
    },
    mounted () {
      this.status = []
      loginStatus().then(res=>{
        this.status = res.data.data
        console.log('status',this.status);
        console.log(this.token);
      })
    },
    methods:{
      submitLogin (phone, password) {
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
              this.user = res.data;

              localStorage.clear();
              sessionStorage.clear();
              sessionStorage.setItem("userid", JSON.stringify(res.data.profile.userId));
              sessionStorage["token"] = JSON.stringify(res.data.token);
              localStorage.setItem("token", res.data.token);
              this.$store.dispatch('setToken',JSON.stringify(res.data.token))

              this.$router.push("/home");
              this.$message({
                type: "success",
                message: "登录成功！",
              });
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
            console.log(res.data);

          }).catch(error => {
            console.log(error);
          });
        }
      },
      logout(){

        if(this.status.account !== null){
          logOut().then(res=>{
            console.log(res);
          })
          sessionStorage.clear();
          localStorage.clear();
          this.$store.dispatch("clearToken")
        }else{
          this.$message("未登录")
        }
      }
    },
  };
</script>

<style scoped>

</style>
