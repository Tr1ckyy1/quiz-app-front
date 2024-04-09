import { createStore } from 'vuex'
import ToastModule from './modules/toast'
import AuthModule from './modules/auth'
import FilterModule from './modules/filter'
import CategoriesModule from './modules/categories'
const store = createStore({
  modules: {
    toast: ToastModule,
    auth: AuthModule,
    filter: FilterModule,
    categories: CategoriesModule
  }
})

export default store
