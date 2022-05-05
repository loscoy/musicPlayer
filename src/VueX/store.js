import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem("token") || "",
      id: localStorage.getItem("userId") || "",
    },
    song: {
      currentIndex: Number(sessionStorage.getItem("currentIndex")) || 0,
      songIdList: JSON.parse(sessionStorage.getItem("songIdList")) || '',
    },
    musicPlayShow: Number(sessionStorage.getItem('musicPlayShow')) || 0,
    playModel: Number(sessionStorage.getItem('playModel')) || 0
  },
  mutations: {
    SET_SONG: (state, data) => {
      state.song.currentIndex = Number(data.currentIndex)
      state.song.songIdList = data.songIdList

      sessionStorage.removeItem('currentIndex')
      sessionStorage.removeItem('songIdList')
      sessionStorage.setItem('currentIndex', JSON.stringify(data.currentIndex))
      sessionStorage.setItem('songIdList', JSON.stringify(state.song.songIdList))
    },
    ADD_INDEX: (state) => {
      if (state.song.currentIndex < state.song.songIdList.length - 1) {
        if (state.playModel === 0) {
          state.song.currentIndex += 1
        } else {
          let length = state.song.songIdList.length
          let random = parseInt(Math.random() * length)
          state.song.currentIndex = random
        }
      } else {
        state.song.currentIndex = 0
      }
      sessionStorage.setItem("currentIndex", JSON.stringify(state.song.currentIndex))
    },
    SUB_INDEX: (state) => {
      if (state.song.currentIndex === 0) {
        state.song.currentIndex = state.song.songIdList.length - 1
      } else {
        if (state.playModel === 0) {
          state.song.currentIndex -= 1
        } else {
          let length = state.song.songIdList.length
          let random = parseInt(Math.random() * length)
          state.song.currentIndex = random
        }
      }
      sessionStorage.setItem("currentIndex", JSON.stringify(state.song.currentIndex))
    },
    SET_USER: (state, data) => {
      state.user.token = data.token
      state.user.id = data.id
      localStorage.clear();
      localStorage.setItem("userId", JSON.stringify(data.id));
      localStorage['token'] = JSON.stringify(data.token)
    },
    CLEAR_USER: (state) => {
      state.user.token = ''
      state.user.id = ''
      localStorage.clear()
    },
    HIND_MUSICPLAY: (state) => {
      state.musicPlayShow = 0
      sessionStorage.removeItem('musicPlayShow')
      sessionStorage.setItem('musicPlayShow', JSON.stringify(state.musicPlayShow))
    },
    SHOW_MUSICPLAY: (state) => {
      state.musicPlayShow = 1
      sessionStorage.removeItem('musicPlayShow')
      sessionStorage.setItem('musicPlayShow', JSON.stringify(state.musicPlayShow))
    },
    CHANGE_PLAYMODEL: (state) => {
      if (state.playModel === 0) {
        state.playModel = 1
      } else {
        state.playModel = 0
      }
      sessionStorage.setItem('playModel', JSON.stringify(state.playModel))
    }
  },

  getters: {

  },

  actions: {
    setUser({
      commit
    }, data) {
      commit('SET_USER', data)
    },
    clearUser({
      commit
    }) {
      commit('CLEAR_USER')
    },
    setSong({
      commit
    }, data) {
      commit('SET_SONG', data)
    },
    addIndex({
      commit
    }) {
      commit("ADD_INDEX");
    },
    subIndex({
      commit
    }) {
      commit("SUB_INDEX")
    },
    showMusicplay({
      commit
    }) {
      commit('SHOW_MUSICPLAY')
    },
    hideMusicplay({
      commit
    }) {
      commit('HIND_MUSICPLAY')
    },
    changePlayModel({
      commit
    }) {
      commit('CHANGE_PLAYMODEL')
    }
  }
})
