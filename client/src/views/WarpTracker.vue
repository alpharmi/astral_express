<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-4xl pb-2 text-title font-bold">Warp Tracker</h1>
                <p>Track the amount of warps you've made, and how <br> many are needed until your next 5 star.</p>
            </div>
        </div>
        <Split/>
        <div>
            <div class="w-40 flex flex-col gap-2 child:drop-shadow-2xl">
                    <button class="pl-0"><img src="/images/other/characterWarp.png"></button>
                    <button class="pl-8"><img src="/images/other/lightConeWarp.png"></button>
                    <button class="pl-8"><img src="/images/other/regularWarp.png"></button>
                </div>
            </div>
        </div>
</template>

<script setup>
    import Split from "../components/Split.vue"
</script>