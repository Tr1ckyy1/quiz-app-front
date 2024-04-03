export default {
  namespaced: true,
  state() {
    return {
      toast: {
        isShowing: false,
        type: '',
        text: '',
        message: ''
      }
    }
  },
  mutations: {
    setToast(state, payload) {
      state.toast = payload
    }
  },
  actions: {
    setToast(context, payload) {
      context.commit('setToast', {
        isShowing: true,
        type: payload.type,
        text: payload.text,
        message: payload.message
      })
      setTimeout(() => {
        context.commit('setToast', {
          isShowing: false,
          type: '',
          text: '',
          message: ''
        })
      }, payload.duration)
    }
  },
  getters: {
    toastValues(state) {
      return state.toast
    }
  }
}
