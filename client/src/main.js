import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import './assets/tailwind.css'

import Home from "./views/Home.vue"
import WarpTracker from "./views/WarpTracker.vue"
import WarpCalculator from "./views/WarpCalculator.vue"
import Import from "./views/Import.vue"

const routes = [
    { path: "", component: Home },
    { path: "/warp", component: WarpTracker },
    { path: "/warp/import", component: Import},
    { path: "/warp/calculator", component: WarpCalculator}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    scrollBehavior() {return { top: 0 }},
    routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")