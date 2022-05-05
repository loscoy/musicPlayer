import axios from 'axios'
import qs from 'qs'


const Api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  withCredentials: true, // 允许跨域设置，不然可能因为拿不到cookie而报错
})
/*请求拦截*/
Api.interceptors.request.use(
  config => {
    if (config.method === 'post' && !(config.data instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": localStorage.getItem('token')
      }
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat'
      }) /* 后端要求传数组的时候做的设置 */
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
/* 响应拦截 */
Api.interceptors.response.use(
  res => {
    return res
  }, error => {
    console.log(error);
    return Promise.resolve(error)
  }
)
export default Api
