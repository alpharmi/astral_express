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
                                    <span class="text-description inline-image"><img src="/images/other/stellar_jade.webp"/>99,999</span>
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
                    </div>
                    <div>
                        <div class="bgcontainer flex flex-col w-[36rem] gap-3 p-5">
                            <div class="flex flex-row justify-center gap-3 child:h-12 child:w-12 child:justify-center child:items-center child:pl-2 child:transition-colors">
                                <button @click="filterWarps('legendary')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.legendary}" class="buttonSquare inline-image">5<img src="/images/other/star.png"/></button>
                                <button @click="filterWarps('rare')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.rare}" class="buttonSquare inline-image hue-rotate-[250deg]">4<img src="/images/other/star.png"/></button>
                                <button @click="filterWarps('common')" :class="{'bg-[#ffb13f] bg-opacity-20': filters.common}" class="buttonSquare inline-image hue-rotate-180">3<img src="/images/other/star.png"/></button>
                            </div>
                            <table class="w-full text-left">
                                <tr class="text-title">
                                    <th class="pl-5">Time</th>
                                    <th class="text-center">Pity</th>
                                    <th>Name</th>
                                </tr>
                                <tr v-for="warp in warps" :class="'warp-' + warp[4]" class="border-t border-gray-900 child:font-normal child:py-2">
                                    <th class="w-[12.5rem] pl-5 text-sm font-mono">{{ timeToDay(warp[3]) }}</th>
                                    <th class="text-center">1</th>
                                    <th class="pr-10 inline-image gap-3"><img :class="[{'scale-[1.5]': warp[2] == 'light_cone'}, {'scale-[2]': warp[2] == 'character'}]" :src="`/images/${warp[2]}/${warp[1].toLowerCase().replaceAll(' ', '_')}.webp`"/>{{ warp[1] }}</th>
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

    const days = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"}

    export default {
        data() {
            return {
                warps: this.warps,
                pulls: {
                    loaded: false,
                    lifetime: null,
                    legendary: null,
                    rare: null
                },
                filters: {
                    legendary: true,
                    rare: true,
                    common: true
                }
            }
        },
        methods: {
            filterWarps(filter) {
                this.filters[filter] ^= true
                this.warps = this.getWarps(10, "character")
            },
            timeToDay(time) {
                return `${days[new Date(time).getDay()]} ${time}`
            },
            getWarps(amount, banner) {
                //const warps = JSON.parse(localStorage.getItem("warps"))[banner].data
                const warps = JSON.parse('{"character":{"lastId":"1683004200000606308","data":[["1683004200000606308","Adversarial","light_cone","2023-05-02 13:14:56"],["1683000600000811408","Loop","light_cone","2023-05-02 12:21:46"],["1682997000001501608","Fine Fruit","light_cone","2023-05-02 11:39:38"],["1682993400001905408","Hidden Shadow","light_cone","2023-05-02 10:54:35"],["1682993400001665408","Pioneering","light_cone","2023-05-02 10:48:12"],["1682993400001659708","Dan Heng","character","2023-05-02 10:48:08"],["1682993400001654708","Hidden Shadow","light_cone","2023-05-02 10:48:02"],["1682921400002232908","Chorus","light_cone","2023-05-01 14:37:49"],["1682921400002218708","Natasha","character","2023-05-01 14:37:40"],["1682921400002216008","Collapsing Sky","light_cone","2023-05-01 14:37:38"],["1682921400002213808","Passkey","light_cone","2023-05-01 14:37:35"],["1682921400002212308","Fine Fruit","light_cone","2023-05-01 14:37:33"],["1682921400002210708","Amber","light_cone","2023-05-01 14:37:30"],["1682921400002209108","Sagacity","light_cone","2023-05-01 14:37:28"],["1682921400002196008","Cornucopia","light_cone","2023-05-01 14:37:15"],["1682921400000389308","Data Bank","light_cone","2023-05-01 14:06:44"],["1682917800002337708","Sagacity","light_cone","2023-05-01 13:41:47"],["1682917800000854608","Post-Op Conversation","light_cone","2023-05-01 13:15:28"],["1682917800000853908","Mediation","light_cone","2023-05-01 13:15:25"],["1682917800000853408","Chorus","light_cone","2023-05-01 13:15:23"],["1682917800000851808","Multiplication","light_cone","2023-05-01 13:15:20"],["1682917800000850908","Data Bank","light_cone","2023-05-01 13:15:17"],["1682917800000822108","Amber","light_cone","2023-05-01 13:14:39"],["1682917800000167308","Shattered Home","light_cone","2023-05-01 13:03:01"],["1682871000001220708","Data Bank","light_cone","2023-05-01 00:16:01"],["1682871000001090108","Amber","light_cone","2023-05-01 00:14:04"],["1682871000000096608","Chorus","light_cone","2023-05-01 00:01:18"],["1682871000000077208","Pela","character","2023-05-01 00:01:07"],["1682867400005202708","Hidden Shadow","light_cone","2023-04-30 23:56:04"],["1682863800000682608","Fine Fruit","light_cone","2023-04-30 22:06:15"],["1682863800000672608","Hook","character","2023-04-30 22:06:11"],["1682745000001554608","Darting Arrow","light_cone","2023-04-29 13:29:22"],["1682737800000339708","Collapsing Sky","light_cone","2023-04-29 11:06:15"],["1682734200001948908","Chorus","light_cone","2023-04-29 10:43:26"],["1682651400001306808","Loop","light_cone","2023-04-28 11:34:46"],["1682647800000465208","Meshing Cogs","light_cone","2023-04-28 10:12:44"],["1682525400001802508","Passkey","light_cone","2023-04-27 00:17:40"],["1682525400001792208","Data Bank","light_cone","2023-04-27 00:17:35"],["1682521800004916808","Natasha","character","2023-04-26 23:40:52"],["1682521800004870308","Sagacity","light_cone","2023-04-26 23:40:24"],["1682521800004856108","Cornucopia","light_cone","2023-04-26 23:40:14"],["1682521800004744308","Mediation","light_cone","2023-04-26 23:39:10"],["1682521800004744208","Asta","character","2023-04-26 23:39:10"],["1682521800004744108","Passkey","light_cone","2023-04-26 23:39:10"],["1682521800004744008","Fine Fruit","light_cone","2023-04-26 23:39:10"],["1682521800004743908","Passkey","light_cone","2023-04-26 23:39:10"],["1682521800004743808","Passkey","light_cone","2023-04-26 23:39:10"],["1682521800004743708","Seele","character","2023-04-26 23:39:10"],["1682521800004743608","Mutual Demise","light_cone","2023-04-26 23:39:10"],["1682521800004743508","Fine Fruit","light_cone","2023-04-26 23:39:10"],["1682521800004743408","Loop","light_cone","2023-04-26 23:39:10"],["1682518200007802608","Loop","light_cone","2023-04-26 22:59:43"],["1682518200007788808","Pela","character","2023-04-26 22:59:40"],["1682518200007778708","Multiplication","light_cone","2023-04-26 22:59:36"],["1682518200007772908","Hidden Shadow","light_cone","2023-04-26 22:59:33"],["1682518200007764408","Arrows","light_cone","2023-04-26 22:59:30"],["1682518200007750308","Passkey","light_cone","2023-04-26 22:59:26"],["1682518200007512408","Darting Arrow","light_cone","2023-04-26 22:57:51"],["1682518200007512308","Cornucopia","light_cone","2023-04-26 22:57:51"],["1682518200007512208","Shared Feeling","light_cone","2023-04-26 22:57:51"],["1682518200007512108","Void","light_cone","2023-04-26 22:57:51"],["1682518200007512008","Adversarial","light_cone","2023-04-26 22:57:51"],["1682518200007511908","Collapsing Sky","light_cone","2023-04-26 22:57:51"],["1682518200007511808","Darting Arrow","light_cone","2023-04-26 22:57:51"],["1682518200007511708","Mutual Demise","light_cone","2023-04-26 22:57:51"],["1682518200007511608","Mediation","light_cone","2023-04-26 22:57:51"],["1682518200007511508","Arrows","light_cone","2023-04-26 22:57:51"],["1682518200007433208","Mediation","light_cone","2023-04-26 22:57:18"],["1682518200007433108","Collapsing Sky","light_cone","2023-04-26 22:57:18"],["1682518200007433008","Natasha","character","2023-04-26 22:57:18"],["1682518200007432908","Mediation","light_cone","2023-04-26 22:57:18"],["1682518200007432808","Mediation","light_cone","2023-04-26 22:57:18"],["1682518200007432708","March 7th","character","2023-04-26 22:57:18"],["1682518200007432608","Loop","light_cone","2023-04-26 22:57:18"],["1682518200007432508","Chorus","light_cone","2023-04-26 22:57:18"],["1682518200007432408","Hidden Shadow","light_cone","2023-04-26 22:57:18"],["1682518200007432308","Arrows","light_cone","2023-04-26 22:57:18"],["1682518200007137708","Hidden Shadow","light_cone","2023-04-26 22:55:06"],["1682518200005823608","Data Bank","light_cone","2023-04-26 22:44:41"],["1682518200005756108","Passkey","light_cone","2023-04-26 22:44:10"],["1682514600005381008","Hidden Shadow","light_cone","2023-04-26 21:38:43"],["1682511000007201808","Shattered Home","light_cone","2023-04-26 20:54:22"],["1682507400006312508","Natasha","character","2023-04-26 19:51:00"],["1682507400000784708","Defense","light_cone","2023-04-26 19:07:07"],["1682507400000749108","Pioneering","light_cone","2023-04-26 19:06:47"],["1682507400000739408","Amber","light_cone","2023-04-26 19:06:42"],["1682507400000730108","Pioneering","light_cone","2023-04-26 19:06:36"],["1682503800003478208","Meshing Cogs","light_cone","2023-04-26 18:32:13"],["1682500200005905908","Void","light_cone","2023-04-26 17:53:29"],["1682500200005529808","Loop","light_cone","2023-04-26 17:49:55"],["1682500200003212508","Darting Arrow","light_cone","2023-04-26 17:30:24"],["1682500200003198408","Planetary Rendezvous","light_cone","2023-04-26 17:30:14"],["1682500200002095208","Chorus","light_cone","2023-04-26 17:20:52"],["1682500200000905608","Chorus","light_cone","2023-04-26 17:09:13"],["1682496600003953608","Natasha","character","2023-04-26 16:36:35"],["1682496600001050908","Hidden Shadow","light_cone","2023-04-26 16:09:33"],["1682493000003202008","Mutual Demise","light_cone","2023-04-26 15:30:36"],["1682489400005773508","Hidden Shadow","light_cone","2023-04-26 14:50:40"],["1682489400004155208","Arrows","light_cone","2023-04-26 14:36:29"],["1682489400000813508","Adversarial","light_cone","2023-04-26 14:06:27"],["1682489400000583008","Shattered Home","light_cone","2023-04-26 14:04:38"],["1682485800001839908","Adversarial","light_cone","2023-04-26 13:16:35"],["1682485800001797308","Darting Arrow","light_cone","2023-04-26 13:16:08"],["1682482200004321808","Natasha","character","2023-04-26 12:36:24"],["1682482200003801608","Mediation","light_cone","2023-04-26 12:32:17"],["1682482200003777408","Defense","light_cone","2023-04-26 12:32:02"],["1682478600005162408","Hidden Shadow","light_cone","2023-04-26 11:43:35"],["1682478600005098508","Cornucopia","light_cone","2023-04-26 11:43:02"],["1682478600002900408","Data Bank","light_cone","2023-04-26 11:24:37"],["1682478600002862208","Qingque","character","2023-04-26 11:24:16"],["1682475000003511408","Shattered Home","light_cone","2023-04-26 10:42:30"],["1682475000003507508","Mutual Demise","light_cone","2023-04-26 10:42:27"],["1682475000003499208","Data Bank","light_cone","2023-04-26 10:42:23"],["1682475000003477808","Gepard","character","2023-04-26 10:42:14"],["1682475000003412008","Pioneering","light_cone","2023-04-26 10:41:31"],["1682475000002042408","Data Bank","light_cone","2023-04-26 10:26:20"],["1682475000002013308","Cornucopia","light_cone","2023-04-26 10:26:02"],["1682475000001573708","Natasha","character","2023-04-26 10:20:58"]]}}')[banner].data

                if (warps) {
                    const latestWarps = []
                    const warpsLength = warps.length
                    var pity = {legendary: null, rare: null}
                    var i = 0

                    while (i < warpsLength) { //latestWarps.length < amount
                        const warp = warps[i]
                        const rarity = rarities[warp[1].toLowerCase().replaceAll(" ", "_")] || "common"

                        if (this.filters[rarity] && latestWarps.length < amount) {
                            warp.push(rarity)
                            latestWarps.push(warp)
                        }

                        if (rarity != "common" && !pity[rarity]) {
                            pity[rarity] = i
                        }

                        if (latestWarps.length >= amount && this.pulls.loaded) {
                            break
                        }

                        i += 1
                    }

                    if (!this.pulls.loaded) {
                        this.pulls.lifetime = warpsLength
                        this.pulls.legendary = pity.legendary
                        this.pulls.rare = pity.rare
                        this.pulls.loaded = true
                    }

                    return latestWarps
                }

                //this.warps = {0: ['1683004200000606308', 'Adversarial', 'light_cone', '2023-05-02 13:14:56', 'common'], 1: ['1683000600000811408', 'Loop', 'light_cone', '2023-05-02 12:21:46', 'common'], 2: ['1682997000001501608', 'Fine Fruit', 'light_cone', '2023-05-02 11:39:38', 'common'], 3: ['1682993400001905408', 'Hidden Shadow', 'light_cone', '2023-05-02 10:54:35', 'common'], 4: ['1682993400001665408', 'Pioneering', 'light_cone', '2023-05-02 10:48:12', 'common'], 5: ['1682993400001659708', 'Dan Heng', 'character', '2023-05-02 10:48:08', 'rare'], 6: ['1682993400001654708', 'Hidden Shadow', 'light_cone', '2023-05-02 10:48:02', 'common'], 7: ['1682921400002232908', 'Chorus', 'light_cone', '2023-05-01 14:37:49', 'common'], 8: ['1682921400002218708', 'Natasha', 'character', '2023-05-01 14:37:40', 'rare'], 9: ['1682921400002216008', 'Collapsing Sky', 'light_cone', '2023-05-01 14:37:38', 'common']}
            }
        },
        mounted: function() {
            this.warps = this.getWarps(10, "character")
        }
    }
</script>

<script setup>
    import Split from "../components/Split.vue"

    import * as vueRouter from "vue-router"

    const router = vueRouter.useRouter()

    function redirect(route) {
        router.push({
            path: route,
        })
    }
</script>