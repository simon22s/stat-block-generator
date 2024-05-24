import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import vuetify from '../src/plugins/vuetify'

createApp(App).use(vuetify).mount('#app')
