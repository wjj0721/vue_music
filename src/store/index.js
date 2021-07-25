import Vue from 'vue'
import Vuex from 'vuex'
import Player from './module/player'

Vue.use(Vuex)
export default new Vuex.Store({
  strict:true,//状态只能通过mutations修改
  state: {
  },
  mutations: {
  },
  actions: {
  },
  //设置仓库的子模块
  modules: {
    Player
  }
})
