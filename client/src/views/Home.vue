<template>
    <div class="flex flex-row flex-wrap w-full px-20 gap-5 place-content-center child:max-w-md">
        <div class="flex flex-col">
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <h1 class="font-bold text-title">Welcome to astral express</h1>
                <p>
                    Multipurpose tool that currently includes to help with
                    your Honkai Adventures. Currently includes warp history, 
                    warp calculator, and general game information.
                    Please note everything is <span class="text-pink">still in development.</span>
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <p>
                    Search through pre-existing community submitted builds
                    for various Characters. Whenever you're looking for
                    a DPS, Support, or more, we have it all.
                </p>
                <button @click="redirect('calculator')" class="flex button mt-3 gap-2 p-1 px-3 items-center">
                    <img class="w-9" src="/images/other/oneiric_shard.webp">
                    <p class="font-bold">Calculator ></p>
                </button>
            </div>
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <p>
                    Search through pre-existing community submitted builds
                    for various Characters. Whenever you're looking for
                    a DPS, Support, or more, we have it all.
                </p>
                <button @click="redirect('warp')" class="flex button mt-3 gap-2 p-1 px-3 items-center">
                    <img class="w-9" src="/images/other/star_rail_pass.webp">
                    <p class="font-bold">Warp History ></p>
                </button>
            </div>
        </div>
    </div>
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