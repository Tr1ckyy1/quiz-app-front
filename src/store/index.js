import { createStore } from 'vuex'
import ToastModule from './modules/toast'
import AuthModule from './modules/auth'
const store = createStore({
  modules: {
    toast: ToastModule,
    auth: AuthModule
  }
})

export default store
