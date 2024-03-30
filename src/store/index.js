import { createStore } from 'vuex'
import ToastModule from './modules/toast'
const store = createStore({
  modules: {
    toast: ToastModule
  }
})

export default store
