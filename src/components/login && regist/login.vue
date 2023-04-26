<template>
  <div class="login">
    <mu-container>
      <mu-form ref="form" class="mu-demo-form" :model="user">
        <mu-form-item label="手机号码" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="user.phone" prop="phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" @keypress.native.enter="submitLogin(user)"
                         v-model="user.password" prop="password">
          </mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submitLogin(user)">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
<!--          <mu-button @click="logout">退出</mu-button>-->
        </mu-form-item>
        <el-link type="primary" @click="toRegister" style="float: left">没有账号?注册</el-link>
        <el-link type="primary" @click="toResetPass" style="float: right">忘记密码?</el-link>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
  import { login, logOut } from "../../Api/user";
  import { mapActions, mapState } from "vuex";
  export default {
    name: "login",
    data () {
      return {
        phoneRules: [
          { validate: (val) => !!val, message: '必须填写手机号码'},
          { validate: (val) => val.length === 11, message: '手机号码必须为11位'}
        ],
        passwordRules: [
          { validate: (val) => !!val, message: '必须填写密码'},
          { validate: (val) => val.length >= 8, message: '密码长度大于等于8'}
        ],
        user: {
          phone: '',
          password: "",
        },

      };
    },
    computed :{
      ...mapState({
        token:state => state.user.token,
      }),
    },
    mounted () {
    },
    methods:{
      submitLogin (user) {
        let that = this
        if (user.phone === "" || user.password === "") {
          this.$toast.info("用户名或密码为空！");
        } else if (this.token) {
          this.$toast.info("请勿重复登录！");
          this.$emit('closeAlert')
        } else {
          login(user).then(res => {
            if (res.data.code === 200) {
              this.$store.dispatch('setUser',{token: res.data.token, id: res.data.profile.userId})
              this.$emit('closeAlert')
              this.$toast.info("登录成功！");
              setTimeout(()=>{
                location.reload()
              },500)
            } else {
              this.$toast.info('错误' + res.data.msg,);
            }
            console.log(res.data);
          }).catch(error => {
            console.log(error);
          });
        }
      },
      clear () {
        this.$refs.form.clear();
        this.validateForm = {
          phone: "",
          password: "",
          isAgree: false,
        };
      },
      toRegister(){
        this.$emit('change', "register","注册")
      },
      toResetPass(){
        this.$emit('change','resetPassword','重置密码')
      }
    },
  };
</script>

<style scoped>

  .input{
    margin: 10px 0;
  }
  .button{
    margin: 10px;
    text-align: center;
  }
</style>
