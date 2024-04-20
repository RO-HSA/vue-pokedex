import './assets/main.css'

import { createApp } from '@vue/compat'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(store).use(BootstrapVue).mount('#app')
