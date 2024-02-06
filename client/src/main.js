import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import './assets/tailwind.css'

import Home from "./views/Home.vue"

const routes = [
    { path: "", component: Home },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    scrollBehavior() {return { top: 0 }},
    routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")