export default {
  namespaced: true,
  state() {
    return {
      activeCategoriesInFilter: [],
      activeLevelsInFilter: [],
      sortBy: ''
    }
  },
  mutations: {
    addInActiveCategories(state, payload) {
      if (!state.activeCategoriesInFilter.includes(payload))
        state.activeCategoriesInFilter.push(payload)
    },
    removeFromActiveCategories(state, payload) {
      const filteredState = state.activeCategoriesInFilter.filter((item) => item !== payload)
      state.activeCategoriesInFilter = filteredState
    },
    setAllCategories(state, payload) {
      state.activeCategoriesInFilter = payload
    },
    addInActiveLevels(state, payload) {
      if (!state.activeLevelsInFilter.includes(payload)) state.activeLevelsInFilter.push(payload)
    },
    removeFromActiveLevels(state, payload) {
      const filteredState = state.activeLevelsInFilter.filter((item) => item !== payload)
      state.activeLevelsInFilter = filteredState
    },
    setAllLevels(state, payload) {
      state.activeLevelsInFilter = payload
    },
    setSort(state, payload) {
      state.sortBy = payload
    }
  },
  actions: {
    addCategoriesOnce(context, payload) {
      context.commit('addInActiveCategories', payload.name)
    },
    addLevelsOnce(context, payload) {
      context.commit('addInActiveLevels', payload.name)
    },
    removeFromActiveCategories(context, payload) {
      context.commit('removeFromActiveCategories', payload)
    },
    removeFromActiveLevels(context, payload) {
      context.commit('removeFromActiveLevels', payload)
    },
    setAllCategories(context, payload) {
      context.commit('setAllCategories', payload)
    },
    triggerCategoriesOrLevels(context, payload) {
      const add = payload.mode === 'categories' ? 'addInActiveCategories' : 'addInActiveLevels'
      const remove =
        payload.mode === 'categories' ? 'removeFromActiveCategories' : 'removeFromActiveLevels'
      const findCategoryOrLevel =
        payload.mode === 'categories' ? 'activeCategoriesInFilter' : 'activeLevelsInFilter'
      const exists = context.state[findCategoryOrLevel].includes(payload.name)
      if (exists) {
        context.commit(remove, payload.name)
      } else context.commit(add, payload.name)
    },
    setAllLevels(context, payload) {
      context.commit('setAllLevels', payload)
    },
    setSort(context, payload) {
      context.commit('setSort', payload)
    }
  },
  getters: {
    getCategoriesInFilter(state) {
      return state.activeCategoriesInFilter
    },
    getLevelsInFilter(state) {
      return state.activeLevelsInFilter
    },
    getSortBy(state) {
      return state.sortBy
    }
  }
}
