import './style.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from './store/index'
import BaseButton from '@/components/ui/BaseButton.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import ToastMessage from '@/components/ui/ToastMessage.vue'
import LoadingSpinner from '@/icons/LoadingSpinner.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('BaseButton', BaseButton)
app.component('TheHeader', TheHeader)
app.component('ToastMessage', ToastMessage)
app.component('LoadingSpinner', LoadingSpinner)

app.mount('#app')
