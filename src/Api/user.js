import api from "../plugins/axios";

export function login(phone,password) {
  return api({
    url:"/login/cellphone?phone=" + phone + "&password=" + password,
    methods: "post"
  })
}
export function loginStatus() {
  return api({
    url:"/login/status",
    methods:"get"
  })
}
export function logOut () {
  return api({
    url:"/logout",
    methods:"get"
  })
}
export function getUserInfo (id) {
  return api({
    url:"/user/detail?uid=" + id,
    methods:"get"
  })

}
