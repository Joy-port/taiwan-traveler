import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const vue = createApp(App)
vue.use(VueAxios, axios)
vue.use(router)
vue.mount('#app')
