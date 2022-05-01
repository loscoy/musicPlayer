import Api from "../plugins/axios";

export function login(data) {
  return Api({
    url:"/login/cellphone",
    methods: "post",
    params:{
      phone:data.phone,
      password:data.password,
    }
  })
}
export function loginStatus() {
  return Api({
    url:"/login/status",
    methods:"get"
  })
}
export function logOut () {
  return Api({
    url:"/logout",
    methods:"get"
  })
}
export function getUserInfo (id) {
  return Api({
    url:"/user/detail?uid=" + id,
    methods:"get"
  })
}

export function getLevelInfo(){
  return Api({
    url:'/user/level',
    method:'get'
  })
}

export function getMusicSheet (id) {
  return Api.get("/user/playlist?uid=" + id)
}

export function getCloud (limit) {
  return Api.get("/user/cloud?limit=" + limit)
}
export function register (data) {
  return Api({
    methods:'post',
    url:"/register/cellphone",
    params:{
      phone: data.phone,
      password: data.password,
      nickname: data.nickname,
      captcha: data.captcha,
    }
  })
}
export function getCaptcha (phone) {
  return Api({
    methods:'get',
    url:"/captcha/sent?phone=" + phone
  })
}
export function verifyCaptcha (phone,captcha) {
  return Api.get("/captcha/verify?phone=" + phone + "&captcha=" + captcha)
}
export function checkPhone (phone) {
  return Api.get("/cellphone/existence/check?phone=" + phone)
}
export function checkNickname (nickname) {
  return Api.get("/nickname/check?nickname=" + nickname)
}
export function getSetting () {
  return Api.get("/setting")
}
export function refreshLogin () {
  return Api.get('/login/refresh')
}
