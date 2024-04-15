import { createStore } from 'vuex'
import ToastModule from './modules/toast'
import AuthModule from './modules/auth'
import FilterModule from './modules/filter'
import CategoriesModule from './modules/categories'
import createMutationsSharer from 'vuex-shared-mutations'

const store = createStore({
  plugins: [createMutationsSharer({ predicate: ['auth/setUser'] })],
  modules: {
    toast: ToastModule,
    auth: AuthModule,
    filter: FilterModule,
    categories: CategoriesModule
  }
})

export default store
