<template>
    <div class="flex flex-col">
        <h1 class="text-4xl pb-2 text-title font-bold">Import Warps</h1>
        <p class="pb-2">Follow the steps below to import your warp history <br> from Honkai: Star Rail.</p>
        <Split/>
        <div class="flex flex-col gap-3">
            <Instruction number="1" description="Open Honkai: Star Rail on PC."/>
            <Instruction number="2" description="Open your Warp History and go to the Records tab."/>
            <Instruction number="3" description="Open Windows PowerShell and paste the following command."/>
            <div class="ml-10 h-auto p-5 bg-container border-[1px] flex flex-row gap-3 items-center border-[#000000] border-opacity-50 rounded-xl">
                <button @click="copytoclipboard" class="h-full">
                    <svg viewBox="0 0 24 24" style=" width:1.5rem; height:1.5rem; fill:white;" class=" svelte-1mzwbk9"><path id="copySvg" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                </button>
                <p id="copyCommand" class="break-all">Start-Process powershell -Verb runAs -ArgumentList '-NoExit -Command "Invoke-Expression <br/> (New-Object Net.WebClient).DownloadString(\"https://raw.githubusercontent.com/alpharmi/astral_express/main/getwarps.ps1\")"'</p>
            </div>
            <a href="https://github.com/alpharmi/astral_express/blob/main/getwarps.ps1" class="ml-10 link w-max">GitHub</a>
            <Instruction number="4" description="Paste the URL that was copied into the box below."/>
            <input id="warpURL" type="text" placeholder="Paste warp URL here" class="ml-10 h-auto p-2 w-72 placeholder-neutral-500 bg-container border-[1px] border-[#000000] border-opacity-50 rounded-xl"/>
            <button @click="importWarps" class="buttonThin ml-10 w-72 h-12 text-center pb-3">Import</button>
        </div>
    </div>
    <div v-if="importing" class="fixed flex flex-col items-center justify-center rounded-md border-[1px] border-[#000000] bg-[#212136] top-[calc(50%-5rem)] left-1/2 -translate-x-1/2 w-80 h-24 px-2">
        <p class="text-description">Importing...</p>
        <p class="text-xl">Warps: <span class="text-title">{{ totalWarps }}</span></p>
        <p class="text-description">Please be patient, this may take awhile.</p>
    </div>
</template>

<script>
    import rarities from "../data/rarities.json"

    export default {
        data() {
            return {
                production: import.meta.env.PROD,
                importing: false,
                totalWarps: 0
            }
        },
        methods: {
            copytoclipboard() {
                const copyCommand = document.getElementById("copyCommand")
                const copySvg = document.getElementById("copySvg")

                navigator.clipboard.writeText(copyCommand.textContent)
                setInterval(function() {
                    copySvg.setAttribute("d", "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z")
                }, 1000)
                copySvg.setAttribute("d", "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z")
            },
            async getWarps(authkey, region, id, banner) {
                //https://astral-express.vercel.app/api/importWarps? http://localhost:3000/api/warps/importWarps?
                const url = this.production? "https://astral-express.vercel.app/api/importWarps?": "http://localhost:3000/api/importWarps?"
                const response = await fetch(url + new URLSearchParams({
                    authkey: authkey,
                    region: region,
                    gacha_type: id,
                    last_id: banner.lastId
                })).then(response => response.json())

                if (response.length > 0) {
                    var bannerData = banner.data
                    bannerData.unshift(...response)

                    const last = {
                        legendary: 0,
                        rare: 0
                    }
                    const pity = {
                        legendary: 0,
                        rare: 0,
                    }
                    const amount = {}
                    const bannerLength = bannerData.length

                    for (const [i, warp] of Object.entries(bannerData).reverse()) {
                        const rarity = rarities[warp[1]]
                        const date = warp[3].substring(0, 7)
                        var amountInMonth = amount[date]

                        if (!amountInMonth) {
                            amount[date] = {total: 0, legendary: 0, rare: 0}
                            amountInMonth = amount[date]
                        }

                        if (rarity) {
                            const current = bannerLength - i
                            const warpPity = current - last[rarity]
                            const date = warp[3].substring(0, 7)

                            last[rarity] = current
                            pity[rarity] = i
                            amountInMonth[rarity] += 1

                            warp[4] = rarity
                            warp[5] = warpPity

                            if (!warp[6]) {
                                if (rarity == "legendary") {
                                    if (warp[2] == "character") {
                                        warp[6] = 90 - Math.ceil((100 * warpPity) / 90)
                                    } else {
                                        warp[6] = 80 - Math.ceil((100 * warpPity) / 80)
                                    }
                                } else if (rarity == "rare") {
                                    warp[6] = (10 - warpPity) * 10
                                }
                            }
                        } else {
                            warp[4] = "common"
                            warp[5] = 1
                        }

                        amountInMonth.total += 1
                    }

                    for (var [date, warps] of Object.entries(amount)) {
                        const formatted = []

                        formatted[0] = warps.total
                        formatted[1] = warps.legendary
                        formatted[2] = warps.rare

                        amount[date] = formatted
                    }

                    //monthlyPulls[new Date().toISOString().substring(0, 7)] = [response.length, amount.legendary, amount.rare]

                    const formattedData = {
                        data: bannerData,
                        pity: [Number(pity.legendary), Number(pity.rare)],
                        lifetime: bannerLength,
                        lastId: bannerData[0][0],
                        monthlyPulls: amount,
                        version: 1
                    }

                    return formattedData
                }

                return null
            },
            async importWarps() {
                if (!this.importing) {
                    const warpURL = document.getElementById("warpURL").value
                    const gachaTypes = {character: 11, light_cone: 12, regular: 1}

                    if (warpURL.startsWith("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog")) {
                        this.importing = true
                        this.totalWarps = 0

                        const authkey = warpURL.split("&authkey=")[1].split("&game_biz=")[0].replaceAll("%2F", "/").replaceAll("%2B", "+").replaceAll("%3D", "=")
                        const region = warpURL.split("&region=")[1].split("&default_gacha_type=")[0]

                        for (const [gachaType, id] of Object.entries(gachaTypes)) {
                            var banner = JSON.parse(localStorage.getItem("warps_" + gachaType))

                            if (!banner) {
                                banner = {data: [], pity: [0, 0], lifetime: 0, lastId: 0, monthlyPulls: [], version: 1}
                                localStorage.setItem("warps_" + gachaType, JSON.stringify(banner))
                            }

                            const warps = await this.getWarps(authkey, region, id, banner)

                            if (warps) {
                                this.totalWarps += warps.data.length

                                localStorage.setItem("warps_" + gachaType, JSON.stringify(warps))  
                            }
                        }

                        this.importing = false
                        if (this.totalWarps > 0) {
                            this.$router.push({path: "/warp"})
                        }
                    }
                }
            }
        }
    }
</script>

<script setup>
    import * as vueRouter from "vue-router"

    import Split from "../components/Split.vue"
    import Instruction from "../components/WarpTracker/Instruction.vue"

    const router = vueRouter.useRouter()
</script>