export default {
  namespaced: true,
  state() {
    return {
      activeCategoriesInFilter: [],
      activeLevelsInFilter: []
    }
  },
  mutations: {
    addInActiveCategories(state, payload) {
      state.activeCategoriesInFilter.push(payload)
    },
    removeFromActiveCategories(state, payload) {
      const filteredState = state.activeCategoriesInFilter.filter((item) => item !== payload)
      state.activeCategoriesInFilter = filteredState
    },
    removeAllCategories(state) {
      state.activeCategoriesInFilter = []
    },
    triggerLevelFilter(state, payload) {
      if (!state.activeLevelsInFilter.includes(payload)) {
        state.activeLevelsInFilter.push(payload)
      } else {
        const findIndex = state.activeLevelsInFilter.findIndex((item) => item === payload)

        state.activeLevelsInFilter.splice(findIndex, 1)
      }
    },
    removeAllLevels(state) {
      state.activeLevelsInFilter = []
    }
  },
  actions: {
    addInActiveCategories(context, payload) {
      if (!context.state.activeCategoriesInFilter.includes(payload)) {
        context.commit('addInActiveCategories', payload)
      } else context.commit('removeFromActiveCategories', payload)
    },
    addOnce(context, payload) {
      context.commit('addInActiveCategories', payload)
    },
    removeAllCategories(context) {
      context.commit('removeAllCategories')
    },
    triggerLevelFilter(context, payload) {
      context.commit('triggerLevelFilter', payload)
    },
    removeAllLevels(context) {
      context.commit('removeAllLevels')
    }
  },
  getters: {
    getCategoriesInFilter(state) {
      return state.activeCategoriesInFilter
    },
    getLevelsInFilter(state) {
      return state.activeLevelsInFilter
    }
  }
}
