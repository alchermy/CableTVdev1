import { createApp } from 'vue'
import '../src/page/main.css'
import App from './App.vue'
import router from './router';

// Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.config.globalProperties.$appName = 'My App'
app.use(vuetify)
app.use(router)
.mount('#app')
