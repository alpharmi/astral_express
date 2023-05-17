<template>
    <div class="fixed flex justify-between items-center top-0 w-full h-14 px-5 backdrop-blur-lg backdrop-brightness-75 border-b-[rgba(255,_255,_255,_0.08)] border-b z-50">
        <div class="font-bold font-sans text-xl flex flex-row gap-1">
            <p class="text-description">astral express</p>
            <p v-for="route in currentRoute()" :id="route"><span class="text-description">/ </span>{{ route }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            currentRoute() {
                const route = this.$router.currentRoute.value.fullPath.split("/").filter(route => route != "")
                return route
            }
        }
    }
</script>

<script setup>
    import * as vueRouter from "vue-router"

    const router = vueRouter.useRouter()
</script>