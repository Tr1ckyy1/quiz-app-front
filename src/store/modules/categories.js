export default {
  namespaced: true,
  state() {
    return {
      allCategories: []
    }
  },
  mutations: {
    setAllCategories(state, payload) {
      state.allCategories = payload
    }
  },
  actions: {
    setAllCategories(context, payload) {
      context.commit('setAllCategories', payload)
    }
  },
  getters: {
    getAllCategories(state) {
      return state.allCategories
    }
  }
}
