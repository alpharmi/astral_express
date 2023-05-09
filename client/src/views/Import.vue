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
            async getWarps(authkey, region, id, lastId) {
                const response = await fetch("http://localhost:3000/api/warps/importWarps?" + new URLSearchParams({ //http://localhost:3000/api/warps/importWarps?
                    authkey: authkey,
                    region: region,
                    gacha_type: id,
                    last_id: lastId
                })).then(response => response.json())

                if (response.length > 0) {
                    const last = {
                        legendary: 0,
                        rare: 0
                    }
                    const pity = {
                        legendary: 0,
                        rare: 0,
                    }
                    const responseLength = response.length

                    for (const [i, warp] of Object.entries(response).reverse()) {
                        const rarity = rarities[warp[1]]

                        if (rarity) {
                            const current = responseLength - i
                            const warpPity = current - last[rarity]

                            last[rarity] = current
                            pity[rarity] = i

                            warp.push(rarity)
                            warp.push(warpPity)
                        } else {
                            warp.push("common")
                            warp.push(1)
                        }
                    }

                    const formattedData = {
                        data: response,
                        pity: pity,
                        lifetime: response.length,
                        lastId: response[0][0]
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
                            const data = JSON.parse(localStorage.getItem("warps_" + gachaType))
                            var lastId = 0

                            if (lastId) {
                                lastId = data.lastId
                            }

                            const warps = await this.getWarps(authkey, region, id, lastId)

                            if (warps) {
                                this.totalWarps += warps.data.length

                                localStorage.setItem("warps_" + gachaType, JSON.stringify(warps))  
                            }
                        }

                        this.importing = false
                        this.$router.push({path: "/warp"})
                    }
                }
            }
        }
    }
</script>

<script setup>
    import * as VueCookies from "vue-cookies"
    import * as vueRouter from "vue-router"

    import Split from "../components/Split.vue"
    import Instruction from "../components/WarpTracker/Instruction.vue"

    const router = vueRouter.useRouter()
</script>