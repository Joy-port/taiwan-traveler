import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

const vue = createApp(App)
vue.use(VueAxios, axios)
vue.mount('#app')
