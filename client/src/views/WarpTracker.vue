<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-4xl pb-2 text-title font-bold">Warp Tracker</h1>
                <p>Track the amount of warps you've made, and how <br> many are needed until your next 5 star.</p>
            </div>
            <button @click="redirect('/warp/import')" class="button p-3 px-20 font-bold text-xl">Import</button>
        </div>
        <Note messages="The following page has yet to been optimised for smaller screen devices/windows.,The following page still has features in-development."/>
        <Split/>
        <div class="flex flex-row gap-10">
            <div class="w-40 min-w-[10rem] flex flex-col gap-2 child:drop-shadow-2xl child:transition-all child:duration-75">
                <button @click="switchBanner('character')" :class="[{'pl-0': banner == 'character'}, {'pl-8': banner != 'character'}]"><img src="/images/other/characterWarp.png"></button>
                <button @click="switchBanner('light_cone')" :class="[{'pl-0': banner == 'light_cone'}, {'pl-8': banner != 'light_cone'}]"><img src="/images/other/lightConeWarp.png"></button>
                <button @click="switchBanner('regular')" :class="[{'pl-0': banner == 'regular'}, {'pl-8': banner != 'regular'}]"><img src="/images/other/regularWarp.png"></button>
            </div>
            <div v-if="!warps" class="bgcontainer w-full h-[19rem] flex flex-col justify-center items-center">
                <p class="text-description">No warp data found.</p>
                <p class="text-title text-2xl">Click the import button to start.</p>
            </div>
            <div v-if="warps">
                <h1 class="text-xl pb-2 text-title capitalize">{{ banner.replace("_", " ") }} Warp</h1>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-row gap-5">
                        <div class="flex flex-col gap-2 w-72">
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title">Lifetime Pulls</p>
                                    <span class="text-description inline-image"><img src="/images/other/stellar_jade.webp"/>{{ (160 * pulls.lifetime).toLocaleString() }}</span>
                                </div>
                                <p class="text-4xl">{{ pulls.lifetime }}</p>
                            </div>
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title inline-image">5<img src="/images/other/star.png"> Pity</p>
                                    <span class="text-description inline-image">Guaranteed at 90</span>
                                </div>
                                <p class="text-4xl text-legendary">{{ pulls.legendary }}</p>
                            </div>
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title inline-image">4<img src="/images/other/star.png"> Pity</p>
                                    <span class="text-description inline-image">Guaranteed at 10</span>
                                </div>
                                <p class="text-4xl text-rare">{{ pulls.rare }}</p>
                            </div>
                        </div>
                        <div class="bgcontainer w-[37.25rem] h-[16.75rem] p-2">
                            <WarpHistory v-if="monthlyPulls" :monthlyPulls="monthlyPulls"/>
                            <div v-if="!monthlyPulls" class="flex justify-center items-center w-full h-full">
                                <p class="text-description">No monthly pull data to display.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="bgcontainer flex flex-col w-[37.25rem] gap-3 p-5">
                            <div class="flex flex-row justify-center gap-3 child:h-12 child:w-12 child:justify-center child:items-center child:pl-2 child:transition-colors">
                                <button @click="filterWarps('legendary')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.legendary}" class="buttonSquare inline-image">5<img src="/images/other/star.png"/></button>
                                <button @click="filterWarps('rare')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.rare}" class="buttonSquare inline-image hue-rotate-[250deg]">4<img src="/images/other/star.png"/></button>
                                <button @click="filterWarps('common')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.common}" class="buttonSquare inline-image hue-rotate-180">3<img src="/images/other/star.png"/></button>
                            </div>
                            <table class="w-full text-left">
                                <tr class="text-title child:font-normal">
                                    <th class="pl-5">Time</th>
                                    <th class="text-center">Pity</th>
                                    <th>Name</th>
                                </tr>
                                <tr v-for="warp in warps" :class="'warp-' + warp[4]" class="border-t border-gray-900 child:font-normal child:py-2">
                                    <th class="w-[12.5rem] pl-5 text-sm font-mono">{{ timeToDay(warp[3]) }}</th>
                                    <th :style="`color: hsl(${warp[6]},100%,70%)`" class="text-center pr-2">{{ warp[5] }}</th>
                                    <th class="inline-image gap-3 capitalize"><img :class="[{'scale-[1.5]': warp[2] == 'light_cone'}, {'scale-[2]': warp[2] == 'character'}]" :src="`/images/${warp[2]}/${warp[1]}.webp`"/>{{ warp[1].replaceAll("_", " ") }}</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const days = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"}

    export default {
        data() {
            return {
                warps: null,
                banner: "character",
                pulls: {
                    lifetime: 0,
                    legendary: 0,
                    rare: 0
                },
                filters: {
                    legendary: true,
                    rare: true,
                    common: true
                },
                monthlyPulls: null
            }
        },
        methods: {
            switchBanner(banner) {
                this.banner = banner
                this.getWarps(10, this.banner)
            },
            filterWarps(filter) {
                this.filters[filter] ^= true
                this.getWarps(10, this.banner)
            },
            timeToDay(time) {
                return `${days[new Date(time).getDay()]} ${time}`
            },
            getWarps(amount, banner) {
                var warps = JSON.parse(localStorage.getItem("warps_" + banner))

                if (warps) {
                    const lifetimeWarps = warps.lifetime

                    this.pulls.lifetime = warps.lifetime
                    this.pulls.legendary = warps.pity[0] || lifetimeWarps
                    this.pulls.rare = warps.pity[1] || 0

                    const filtered = warps.data.filter(warp => this.filters[warp[4]]).slice(0, amount)

                    this.monthlyPulls = Object.fromEntries(Object.entries(warps.monthlyPulls).slice(0, 5))
                    this.warps = filtered
                }

                return null
            }
        },
        mounted: function() {
            this.getWarps(10, this.banner)
        }
    }
</script>

<script setup>
    import Note from "../components/Note.vue"
    import Split from "../components/Split.vue"
    import WarpHistory from "../components/WarpTracker/WarpHistory.vue"

    import * as vueRouter from "vue-router"

    const router = vueRouter.useRouter()

    function redirect(route) {
        router.push({
            path: route,
        })
    }
</script>