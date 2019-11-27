import request from '@/utils/request'
import { post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    waiters: [],
    loading: false
  },
  getters: {

  },
  mutations: {
    refreshWaiters(state, waiters) {
      state.waiters = waiters
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    }
  },
  actions: {
    // 查询数据
    async findAllWaiter({ dispatch, commit }) {
      commit('beginLoading')
      const response = await request.get('/waiter/findAll')
      // 将查询结果更新到state中
      commit('refreshWaiters', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    }
  }
}
