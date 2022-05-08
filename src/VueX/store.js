import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: "",
      id: "",
    },
    song: {
      currentIndex: 0,
      songIdList: "",
    },
    musicPlayShow:  0,
    playModel: 0
  },
  mutations: {
    SET_SONG: (state, data) => {
      state.song.currentIndex = Number(data.currentIndex)
      state.song.songIdList = data.songIdList
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
    },
    SET_USER: (state, data) => {
      state.user.token = data.token
      state.user.id = data.id
    },
    CLEAR_USER: (state) => {
      state.user.token = ''
      state.user.id = ''
    },
    HIND_MUSICPLAY: (state) => {
      state.musicPlayShow = 0
    },
    SHOW_MUSICPLAY: (state) => {
      state.musicPlayShow = 1
    },
    CHANGE_PLAYMODEL: (state) => {
      if (state.playModel === 0) {
        state.playModel = 1
      } else {
        state.playModel = 0
      }
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
  },
  plugins:[createPersistedState()]
})
