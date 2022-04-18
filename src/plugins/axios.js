import axios from 'axios'
import qs from 'qs'
import router from 'vue-router'

axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

axios.defaults.baseURL = 'http://localhost:3000/'   /*这里的地址就是刚刚启起来的服务器地址  */

/*请求拦截*/
axios.interceptors.request.use(
  config => {
    if (config.meth === 'post' && !(config.data instanceof FormData)) {
      if (localStorage.getItem('token')) {
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": window.localStorage.getItem('token')
        }
      }
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' }) /*这里是，后端要求传数组的时候做的设置，以前出过错*/
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
/* 响应拦截 */
axios.interceptors.response.use(
  res => {
    /*可在这里根据返回的状态码做一些拦截操作*/
    return res
  }, error => {
    if(error.response.status === '401'){
      //要知道还有登录过期的情况，后台也是返回 ‘401’，所以这里就要有如果是这种情况的处理
      window.localStorage.removeItem('token')
      //别忘了import引入router就行
      router.replace({
        path:'/loginPage/user',
        // query:{
        //   redirect:router.app.$router.funllPath
        // }
      })
    }
    return Promise.resolve(error)
  }
)
export default axios  /*记得导出*/
