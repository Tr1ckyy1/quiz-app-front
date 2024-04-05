import { createStore } from 'vuex'
import ToastModule from './modules/toast'
import AuthModule from './modules/auth'
import QuizzesModule from './modules/quizzes'
const store = createStore({
  modules: {
    toast: ToastModule,
    auth: AuthModule,
    quizzes: QuizzesModule
  }
})

export default store
