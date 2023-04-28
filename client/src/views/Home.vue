<template>
    <p>test</p>
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