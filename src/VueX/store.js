
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: sessionStorage.getItem("token") || "",
      id: sessionStorage.getItem("userid") || "",
    },

  },
  mutations: {
    SET_USER:(state, data)=>{
      state.user.token = data.token
      state.user.id = data.id
    }
  },
  getters : {

  },
  // vue代码里面 this.$store.dispatch触发action里面的定义的方法
  actions: {
    setToken({ commit }, data){
      commit('SET_USER', data)
    },
    clearToken({ commit }){
      commit('SET_USER','')
    }
  }
})
