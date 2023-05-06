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
                                <tr v-for="warp in warps" :class="'warp-' + warp[5]" class="border-t border-gray-900 child:font-normal child:py-2">
                                    <th class="w-[12.5rem] pl-5 text-sm font-mono">{{ timeToDay(warp[3]) }}</th>
                                    <th :style="`color: hsl(${warp[6]},100%,70%)`" class="text-center pr-2">{{ warp[4] }}</th>
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
                const warps = JSON.parse('{"character":{"lastId":"1683004200000606308","data":[["1683004200000606308","adversarial","light_cone","2023-05-02 13:14:56",1],["1683000600000811408","loop","light_cone","2023-05-02 12:21:46",1],["1682997000001501608","fine_fruit","light_cone","2023-05-02 11:39:38",1],["1682993400001905408","hidden_shadow","light_cone","2023-05-02 10:54:35",1],["1682993400001665408","pioneering","light_cone","2023-05-02 10:48:12",1],["1682993400001659708","dan_heng","character","2023-05-02 10:48:08",3],["1682993400001654708","hidden_shadow","light_cone","2023-05-02 10:48:02",1],["1682921400002232908","chorus","light_cone","2023-05-01 14:37:49",1],["1682921400002218708","natasha","character","2023-05-01 14:37:40",9],["1682921400002216008","collapsing_sky","light_cone","2023-05-01 14:37:38",1],["1682921400002213808","passkey","light_cone","2023-05-01 14:37:35",1],["1682921400002212308","fine_fruit","light_cone","2023-05-01 14:37:33",1],["1682921400002210708","amber","light_cone","2023-05-01 14:37:30",1],["1682921400002209108","sagacity","light_cone","2023-05-01 14:37:28",1],["1682921400002196008","cornucopia","light_cone","2023-05-01 14:37:15",1],["1682921400000389308","data_bank","light_cone","2023-05-01 14:06:44",1],["1682917800002337708","sagacity","light_cone","2023-05-01 13:41:47",1],["1682917800000854608","post-op_conversation","light_cone","2023-05-01 13:15:28",10],["1682917800000853908","mediation","light_cone","2023-05-01 13:15:25",1],["1682917800000853408","chorus","light_cone","2023-05-01 13:15:23",1],["1682917800000851808","multiplication","light_cone","2023-05-01 13:15:20",1],["1682917800000850908","data_bank","light_cone","2023-05-01 13:15:17",1],["1682917800000822108","amber","light_cone","2023-05-01 13:14:39",1],["1682917800000167308","shattered_home","light_cone","2023-05-01 13:03:01",1],["1682871000001220708","data_bank","light_cone","2023-05-01 00:16:01",1],["1682871000001090108","amber","light_cone","2023-05-01 00:14:04",1],["1682871000000096608","chorus","light_cone","2023-05-01 00:01:18",1],["1682871000000077208","pela","character","2023-05-01 00:01:07",3],["1682867400005202708","hidden_shadow","light_cone","2023-04-30 23:56:04",1],["1682863800000682608","fine_fruit","light_cone","2023-04-30 22:06:15",1],["1682863800000672608","hook","character","2023-04-30 22:06:11",8],["1682745000001554608","darting_arrow","light_cone","2023-04-29 13:29:22",1],["1682737800000339708","collapsing_sky","light_cone","2023-04-29 11:06:15",1],["1682734200001948908","chorus","light_cone","2023-04-29 10:43:26",1],["1682651400001306808","loop","light_cone","2023-04-28 11:34:46",1],["1682647800000465208","meshing_cogs","light_cone","2023-04-28 10:12:44",1],["1682525400001802508","passkey","light_cone","2023-04-27 00:17:40",1],["1682525400001792208","data_bank","light_cone","2023-04-27 00:17:35",1],["1682521800004916808","natasha","character","2023-04-26 23:40:52",4],["1682521800004870308","sagacity","light_cone","2023-04-26 23:40:24",1],["1682521800004856108","cornucopia","light_cone","2023-04-26 23:40:14",1],["1682521800004744308","mediation","light_cone","2023-04-26 23:39:10",1],["1682521800004744208","asta","character","2023-04-26 23:39:10",10],["1682521800004744108","passkey","light_cone","2023-04-26 23:39:10",1],["1682521800004744008","fine_fruit","light_cone","2023-04-26 23:39:10",1],["1682521800004743908","passkey","light_cone","2023-04-26 23:39:10",1],["1682521800004743808","passkey","light_cone","2023-04-26 23:39:10",1],["1682521800004743708","seele","character","2023-04-26 23:39:10",66],["1682521800004743608","mutual_demise","light_cone","2023-04-26 23:39:10",1],["1682521800004743508","fine_fruit","light_cone","2023-04-26 23:39:10",1],["1682521800004743408","loop","light_cone","2023-04-26 23:39:10",1],["1682518200007802608","loop","light_cone","2023-04-26 22:59:43",1],["1682518200007788808","pela","character","2023-04-26 22:59:40",7],["1682518200007778708","multiplication","light_cone","2023-04-26 22:59:36",1],["1682518200007772908","hidden_shadow","light_cone","2023-04-26 22:59:33",1],["1682518200007764408","arrows","light_cone","2023-04-26 22:59:30",1],["1682518200007750308","passkey","light_cone","2023-04-26 22:59:26",1],["1682518200007512408","darting_arrow","light_cone","2023-04-26 22:57:51",1],["1682518200007512308","cornucopia","light_cone","2023-04-26 22:57:51",1],["1682518200007512208","shared_feeling","light_cone","2023-04-26 22:57:51",10],["1682518200007512108","void","light_cone","2023-04-26 22:57:51",1],["1682518200007512008","adversarial","light_cone","2023-04-26 22:57:51",1],["1682518200007511908","collapsing_sky","light_cone","2023-04-26 22:57:51",1],["1682518200007511808","darting_arrow","light_cone","2023-04-26 22:57:51",1],["1682518200007511708","mutual_demise","light_cone","2023-04-26 22:57:51",1],["1682518200007511608","mediation","light_cone","2023-04-26 22:57:51",1],["1682518200007511508","arrows","light_cone","2023-04-26 22:57:51",1],["1682518200007433208","mediation","light_cone","2023-04-26 22:57:18",1],["1682518200007433108","collapsing_sky","light_cone","2023-04-26 22:57:18",1],["1682518200007433008","natasha","character","2023-04-26 22:57:18",3],["1682518200007432908","mediation","light_cone","2023-04-26 22:57:18",1],["1682518200007432808","mediation","light_cone","2023-04-26 22:57:18",1],["1682518200007432708","march_7th","character","2023-04-26 22:57:18",10],["1682518200007432608","loop","light_cone","2023-04-26 22:57:18",1],["1682518200007432508","chorus","light_cone","2023-04-26 22:57:18",1],["1682518200007432408","hidden_shadow","light_cone","2023-04-26 22:57:18",1],["1682518200007432308","arrows","light_cone","2023-04-26 22:57:18",1],["1682518200007137708","hidden_shadow","light_cone","2023-04-26 22:55:06",1],["1682518200005823608","data_bank","light_cone","2023-04-26 22:44:41",1],["1682518200005756108","passkey","light_cone","2023-04-26 22:44:10",1],["1682514600005381008","hidden_shadow","light_cone","2023-04-26 21:38:43",1],["1682511000007201808","shattered_home","light_cone","2023-04-26 20:54:22",1],["1682507400006312508","natasha","character","2023-04-26 19:51:00",9],["1682507400000784708","defense","light_cone","2023-04-26 19:07:07",1],["1682507400000749108","pioneering","light_cone","2023-04-26 19:06:47",1],["1682507400000739408","amber","light_cone","2023-04-26 19:06:42",1],["1682507400000730108","pioneering","light_cone","2023-04-26 19:06:36",1],["1682503800003478208","meshing_cogs","light_cone","2023-04-26 18:32:13",1],["1682500200005905908","void","light_cone","2023-04-26 17:53:29",1],["1682500200005529808","loop","light_cone","2023-04-26 17:49:55",1],["1682500200003212508","darting_arrow","light_cone","2023-04-26 17:30:24",1],["1682500200003198408","planetary_rendezvous","light_cone","2023-04-26 17:30:14",3],["1682500200002095208","chorus","light_cone","2023-04-26 17:20:52",1],["1682500200000905608","chorus","light_cone","2023-04-26 17:09:13",1],["1682496600003953608","natasha","character","2023-04-26 16:36:35",9],["1682496600001050908","hidden_shadow","light_cone","2023-04-26 16:09:33",1],["1682493000003202008","mutual_demise","light_cone","2023-04-26 15:30:36",1],["1682489400005773508","hidden_shadow","light_cone","2023-04-26 14:50:40",1],["1682489400004155208","arrows","light_cone","2023-04-26 14:36:29",1],["1682489400000813508","adversarial","light_cone","2023-04-26 14:06:27",1],["1682489400000583008","shattered_home","light_cone","2023-04-26 14:04:38",1],["1682485800001839908","adversarial","light_cone","2023-04-26 13:16:35",1],["1682485800001797308","darting_arrow","light_cone","2023-04-26 13:16:08",1],["1682482200004321808","natasha","character","2023-04-26 12:36:24",6],["1682482200003801608","mediation","light_cone","2023-04-26 12:32:17",1],["1682482200003777408","defense","light_cone","2023-04-26 12:32:02",1],["1682478600005162408","hidden_shadow","light_cone","2023-04-26 11:43:35",1],["1682478600005098508","cornucopia","light_cone","2023-04-26 11:43:02",1],["1682478600002900408","data_bank","light_cone","2023-04-26 11:24:37",1],["1682478600002862208","qingque","character","2023-04-26 11:24:16",8],["1682475000003511408","shattered_home","light_cone","2023-04-26 10:42:30",1],["1682475000003507508","mutual_demise","light_cone","2023-04-26 10:42:27",1],["1682475000003499208","data_bank","light_cone","2023-04-26 10:42:23",1],["1682475000003477808","gepard","character","2023-04-26 10:42:14",5],["1682475000003412008","pioneering","light_cone","2023-04-26 10:41:31",1],["1682475000002042408","data_bank","light_cone","2023-04-26 10:26:20",1],["1682475000002013308","cornucopia","light_cone","2023-04-26 10:26:02",1],["1682475000001573708","natasha","character","2023-04-26 10:20:58",1]]}}')[banner].data

                if (warps) {
                    const latestWarps = []
                    const warpsLength = warps.length
                    var pity = {legendary: null, rare: null}
                    var i = 0

                    while (i < warpsLength) { //latestWarps.length < amount
                        const warp = warps[i]
                        const rarity = rarities[warp[1]] || "common"

                        if (this.filters[rarity] && latestWarps.length < amount) {
                            warp.push(rarity)

                            if (rarity == "legendary") {
                                warp.push(90 - warp[4])
                            } /* else if (rarity == "rare") {
                                warp.push((10 - warp[4]) * 20)
                            }
                            */

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