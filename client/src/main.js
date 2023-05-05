import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import './assets/tailwind.css'

import Home from "./views/Home.vue"
import WarpTracker from "./views/WarpTracker.vue"
import Import from "./views/Import.vue"
import Calculator from "./views/Calculator.vue"

const routes = [
    { path: "", component: Home },
    { path: "/warp", component: WarpTracker },
    { path: "/warp/import", component: Import},
    { path: "/calculator", component: Calculator}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    scrollBehavior() {return { top: 0 }},
    routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")