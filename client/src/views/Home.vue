<template>
    <p class="link" @click="redirect('calculator')">test link calculator</p>
    <p class="link" @click="redirect('warp')">test link warp</p>
</template>

<script setup>
    import * as vueRouter from "vue-router"

    const router = vueRouter.useRouter()

    function redirect(route) {
        router.push({
            path: route,
        })
    }
</script>