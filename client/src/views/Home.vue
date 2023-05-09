<template>
    <div class="flex flex-row flex-wrap w-full px-20 gap-5 place-content-center child:max-w-md">
        <div class="flex flex-col gap-5">
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <h1 class="font-bold text-title pb-2">Welcome to astral express</h1>
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
                    Calculate the amount of warps needed to hit your
                    next soft or hard pity. Includes the option to
                    switch between Character and Light Cone banners.
                </p>
                <button @click="redirect('warp/calculator')" class="flex button mt-3 gap-2 p-1 px-3 items-center">
                    <img class="w-9" src="/images/other/oneiric_shard.webp">
                    <p class="font-bold">Warp Calculator ></p>
                </button>
            </div>
            <div class="bgcontainer p-4 flex-col bg-bg-dark-80 gap-3">
                <p>
                    Import your warp history to view your latest and
                    previous pulls for Character, Light Cone, Regular
                    banners.
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