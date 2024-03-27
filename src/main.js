import './style.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import BaseButton from '@/components/ui/BaseButton.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import ToastMessage from '@/components/ui/ToastMessage.vue'

const app = createApp(App)

app.use(router)
app.component('BaseButton', BaseButton)
app.component('TheHeader', TheHeader)
app.component('ToastMessage', ToastMessage)

app.mount('#app')
