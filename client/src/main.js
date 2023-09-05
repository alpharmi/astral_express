import { createApp } from 'vue'
import { inject } from '@vercel/analytics'
import { createI18n } from 'vue-i18n'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import messages from './i18n.js'
import './assets/tailwind.css'

import Home from './views/HomePage.vue'
import WarpTracker from './views/WarpTrackerPage.vue'
import WarpCalculator from './views/WarpCalculatorPage.vue'
import Global from './views/GlobalPage.vue'
import Import from './views/ImportPage.vue'

// import Player from "./views/PlayerPage.vue"
import PrivacyPolicy from './views/PrivacyPolicyPage.vue'

const routes = [
  { path: '', component: Home },
  { path: '/warp', component: WarpTracker },
  { path: '/warp/global', component: Global },
  { path: '/warp/import', component: Import },
  { path: '/warp/calculator', component: WarpCalculator },
  // { path: "/player", component: Player },
  // { path: "/player/:uid", name: "player", component: Player, props: true },
  { path: '/privacy-policy', component: PrivacyPolicy },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  scrollBehavior() { return { top: 0 } },
  routes,
})

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
inject()
