import { createApp } from 'vue'
import App from './App.vue'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


import router from './router/index'
import store from './store/index'


createApp(App).use(router).use(store).use(Quasar, { plugins: {} }).mount('#app')
