<template>
  <div class="register">
    <mu-container>
      <mu-form ref="form" :model="user" class="mu-demo-form">
        <mu-form-item label="用户名" prop="nickname" :rules="nicknameRules">
          <mu-text-field v-model="user.nickname" prop="nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="user.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="手机号码" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="user.phone" prop="phone">
            <mu-button flat color="error" @click="postCaptcha(user.phone)">发送验证码</mu-button>
          </mu-text-field>
        </mu-form-item>
        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field v-model="user.captcha" @keypress.native.enter="submitRegister(user)" prop="captcha"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submitRegister(user)">注册</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
        <el-link type="primary" @click="toLogin">已有账号？登录</el-link>
      </mu-form>
    </mu-container>
  </div>
</template>
<script>
  import { register, verifyCaptcha, getCaptcha, checkPhone, checkNickname } from "../../Api/user";

  export default {
    name: "regist",
    data () {
      return {
        nicknameRules: [
          { validate: (val) => !!val, message: '必须填写用户名'},
        ],
        passwordRules: [
          { validate: (val) => !!val, message: '必须填写密码'},
          { validate: (val) => val.length >= 8 , message: '密码长度大于8'}
        ],
        phoneRules: [
          { validate: (val) => !!val, message: '必须填写手机号码'},
          { validate: (val) => val.length === 11, message: '手机号码为11位'},
        ],
        captchaRules: [
          { validate: (val) => !!val, message: '必须填写验证码'},
        ],
        user: {
          phone: "",
          password: "",
          nickname: "",
          captcha: "",
        },
      }
    },
    mounted () {

    },
    methods: {
      submitRegister (user) {
        // console.log(user);
        checkPhone(user.phone).then(res => {
          if(res.data.exist === 1){
            this.$toast.info('手机号已被注册')
          }else{
            verifyCaptcha(user.phone,user.captcha).then(res => {
              if (res.code === 503) { //验证码错误
                this.$toast.info('验证码错误')
              }else{
                register(user).then(res => {
                  // console.log(res);
                  if(res.data.nickname){
                    this.$toast.info('该昵称已被占用')
                  }else{
                    this.$toast.info('注册成功')
                    // this.$store.dispatch('setToken',{token: res.data.token, id: res.data.profile.userId})
                    this.setUser('setUser',{token: res.token, id: res.data.account.userId}) //同上写法
                    this.$emit('closeAlert')
                    setTimeout(()=>{
                      location.reload()
                    },500)
                  }
                })
              }
            })
          }
        })
      },
      postCaptcha (phone) {
        if(phone !== '' && phone.length === 11){
          getCaptcha(phone).then(res => {
            if(res){
              this.$toast.info('验证码发送成功')
            }
          });
        }else{
          this.$toast.info('手机号码输入有误')
        }
      },
      clear () {
        this.$refs.form.clear();
        this.validateForm = {
          username: "",
          password: "",
          isAgree: false,
        };
      },
      toLogin(){
        this.$emit('change','login','登录','暂不登录')
      }
    }
  };
</script>

<style scoped>

</style>
