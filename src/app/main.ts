import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'
import i18n from '@/shared/config/i18n'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './styles/base.css'

// Mark that JS is active so CSS can safely hide .reveal elements
document.documentElement.classList.add('js')

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.use(i18n)
app.mount('#app')
