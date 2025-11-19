import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Dark mode (optional) */
import '@ionic/vue/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

const app = createApp(App)

/* ✅ ต้องใช้ลำดับนี้เท่านั้น */
app.use(IonicVue)
app.use(router)

/* ✅ ต้องรอ router พร้อมก่อน mount app */
router.isReady().then(() => {
  app.mount('#app')
})
