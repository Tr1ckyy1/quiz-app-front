export default {
  namespaced: true,
  state() {
    return {
      userLoggedIn: false
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userLoggedIn = payload
    }
  },
  actions: {
    login(context) {
      context.commit('setUser', true)
    },
    logout(context) {
      context.commit('setUser', false)
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.userLoggedIn
    }
  }
}
