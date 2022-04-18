
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || ''  //初始化token
  },
  mutations: {
    //存储token方法
    //设置token等于外部传递进来的值
    SET_TOKEN:(state, token)=>{
      state.token = token
    }
  },
  getters : {

  },
  // vue代码里面 this.$store.dispatch触发action里面的定义的方法
  actions: {
    setToken(context,token){
      context.commit('SET_TOKEN',token)
    },
    clearToken(context){
      context.commit('SET_TOKEN','')
    }
  }
})
