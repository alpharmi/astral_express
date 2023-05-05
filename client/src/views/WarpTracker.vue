<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-4xl pb-2 text-title font-bold">Warp Tracker</h1>
                <p>Track the amount of warps you've made, and how <br> many are needed until your next 5 star.</p>
            </div>
            <button @click="redirect('/warp/import')" class="button p-3 px-20 font-bold text-xl">Import</button>
        </div>
        <Split/>
        <div class="flex flex-row gap-10">
            <div class="w-40 min-w-[10rem] flex flex-col gap-2 child:drop-shadow-2xl">
                <button class="pl-0"><img src="/images/other/characterWarp.png"></button>
                <button class="pl-8"><img src="/images/other/lightConeWarp.png"></button>
                <button class="pl-8"><img src="/images/other/regularWarp.png"></button>
            </div>
            <div>
                <h1 class="text-xl pb-2 text-title">Character Warp</h1>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-row">
                        <div class="flex flex-col gap-2 w-72">
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title">Lifetime Pulls</p>
                                    <span class="text-description inline-image"><img src="/images/items/stellar_jade.webp"/>99,999</span>
                                </div>
                                <p class="text-4xl">999</p>
                            </div>
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title inline-image">5<img src="/images/other/star.png"> Pity</p>
                                    <span class="text-description inline-image">Guaranteed at 90</span>
                                </div>
                                <p class="text-4xl text-legendary">999</p>
                            </div>
                            <div class="bgcontainer p-2 flex flex-row justify-between items-center">
                                <div>
                                    <p class="text-title inline-image">4<img src="/images/other/star.png"> Pity</p>
                                    <span class="text-description inline-image">Guaranteed at 10</span>
                                </div>
                                <p class="text-4xl text-rare">999</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="bgcontainer flex flex-col w-[36rem] p-5">
                            <table class="w-full text-left">
                                <tr class="text-title">
                                    <th class="pl-5">Time</th>
                                    <th class="text-center">Pity</th>
                                    <th>Name</th>
                                </tr>
                                <tr v-for="warp in warps" :class="'warp-' + warp[4]" class="border-t border-gray-900 child:font-normal child:py-2">
                                    <th class="w-[12.5rem] pl-5 text-sm font-mono">{{ timeToDay(warp[3]) }}</th>
                                    <th class="text-center">74</th>
                                    <th class="pr-10 inline-image gap-3"><img :class="[{'scale-[1.5]': warp[2] == 'light_cone'}, {'scale-[2]': warp[2] == 'character'}]" :src="`/images/items/${warp[2]}/${warp[1].toLowerCase().replaceAll(' ', '_')}.webp`"/>{{ warp[1] }}</th>
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
    import rarities from "../data/rarities.json"

    const days = {1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 7: "Sun"}

    export default {
        data() {
            return {
                warps: this.warps
            }
        },
        methods: {
            timeToDay(time) {
                return `${days[new Date(time).getDay()]} ${time}`
            }
        },
        mounted: function() {
            /*
            var warps = JSON.parse(localStorage.getItem("warps"))

            if (warps) {
                warps = warps.characterWarps.data.slice(0, 10)

                console.log(warps)

                for (const [i, warp] of Object.entries(warps)) {
                    const rarity = rarities[warp[1].toLowerCase().replaceAll(" ", "_")] || "common"

                    warp.push(rarity)
                }

                this.warps = warps
            }
            */

            this.warps = {0: ['1683004200000606308', 'Adversarial', 'light_cone', '2023-05-02 13:14:56', 'common'], 1: ['1683000600000811408', 'Loop', 'light_cone', '2023-05-02 12:21:46', 'common'], 2: ['1682997000001501608', 'Fine Fruit', 'light_cone', '2023-05-02 11:39:38', 'common'], 3: ['1682993400001905408', 'Hidden Shadow', 'light_cone', '2023-05-02 10:54:35', 'common'], 4: ['1682993400001665408', 'Pioneering', 'light_cone', '2023-05-02 10:48:12', 'common'], 5: ['1682993400001659708', 'Dan Heng', 'character', '2023-05-02 10:48:08', 'rare'], 6: ['1682993400001654708', 'Hidden Shadow', 'light_cone', '2023-05-02 10:48:02', 'common'], 7: ['1682921400002232908', 'Chorus', 'light_cone', '2023-05-01 14:37:49', 'common'], 8: ['1682921400002218708', 'Natasha', 'character', '2023-05-01 14:37:40', 'rare'], 9: ['1682921400002216008', 'Collapsing Sky', 'light_cone', '2023-05-01 14:37:38', 'common']}
        }
    }
</script>

<script setup>
    import Split from "../components/Split.vue"
</script>