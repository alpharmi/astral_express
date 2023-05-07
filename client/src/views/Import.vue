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
    <div v-if="importing" class="fixed flex flex-col items-center justify-center rounded-md border-[1px] border-[#000000] bg-[#212136] top-[calc(50%-5rem)] left-1/2 -translate-x-1/2 w-44 h-24">
        <p class="text-description">Importing...</p>
        <p class="text-xl">Warps: <span class="text-title">{{ totalWarps }}</span></p>
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
            async getWarps(authkey, region, id) {
                const response = await fetch("https://astral-express.vercel.app/api/test?" + new URLSearchParams({
                    authkey: authkey,
                    region: region,
                    gacha_type: id
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
                const warpURL = document.getElementById("warpURL").value

                this.totalWarps = 0

                //const warpURL = "https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&win_mode=fullscreen&gacha_id=dbebc8d9fbb0d4ffa067423482ce505bc5ea&timestamp=1681910018&region=prod_official_asia&default_gacha_type=11&lang=en&authkey=Kj%2BzreDlnYrdkNq3glOEs%2BMMfK9aWq2kRH6vWUAfA6DtNdgL0%2F%2FxBEhFb4FlKTaulkEoyGwGjqmHFecQK78h9iHWAxot1i7cxGejc6kNSBvjNKWwOIXUa6kP0oo2ollzTk3nD%2BOFdLCGJRgqn1EGxXq5rSIoDDSw2K2N%2FbDuX5SzzokvfhfZCWZHa744og%2FuL4YAfWAGmy3gyQr3JuW3ORFMc%2BsDInDBQk6DzOXq%2FBWLIH5l5NoMQQDqaG3XUJmfg5l%2FUmnPQBLHkKDdropcsYPk4FvjBRIZBSGlsxm1xVCdZjBjFjliapXGstlXx09K%2F3npJJapMw2qynVDVlokBwxj7XRgh5ca9QUyhUP%2B23K1bFUzmC6Fr%2FOsXetlnrZ8Q46Kr8mGtNGIJaybYEu%2BnLSu9Y1PEdgE%2FFW664yhOeJT4j21anIbW%2Bc2R40L6FGs9sbgGzxhJcGUP%2BhIRWGvA4svONA2N%2B6X0extVGUmDPewgJJuZ687Hj0cNKr1vsN%2BllSCpM3adg5Xpf1n5wEWL6nUq213mdKdhrVeX7QYeRN%2FzzNxnsj%2Bt6h3qodloK6hdn%2FwnI%2F11o3EvKnB6vXMrSKIAUBGEBYOZV86jIHMZpgKCcsEZY69UACC%2BnYZGUTC1JIt%2B5Ypa4mkQpsNjIjEM6%2BJ0OGXFGk9sKJ6hwUKDcM%3D&game_biz=hkrpg_global&os_system=Windows%2010%20%20%2810.0.19044%29%2064bit&device_model=B360%20AORUS%20GAMING%203%20%28Gigabyte%20Technology%20Co.%2C%20Ltd.%29&plat_type=pc&page=1&size=5&gacha_type=11&end_id=0"
                const gachaTypes = {character: 11, light_cone: 12, regular: 1}

                if (warpURL.startsWith("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog")) {
                    this.importing = true

                    const authkey = warpURL.split("&authkey=")[1].split("&game_biz=")[0].replaceAll("%2F", "/").replaceAll("%2B", "+").replaceAll("%3D", "=")
                    const region = warpURL.split("&region=")[1].split("&default_gacha_type=")[0]

                    for (const [gachaType, id] of Object.entries(gachaTypes)) {
                        const warps = await this.getWarps(authkey, region, id)

                        if (warps) {
                            this.totalWarps += warps.data.length

                            localStorage.setItem("warps_" + gachaType, JSON.stringify(warps))  
                        }
                    }

                    this.importing = false
                }
            }
        }
    }
</script>

<script setup>
    import * as VueCookies from "vue-cookies"

    import Split from "../components/Split.vue"
    import Instruction from "../components/WarpTracker/Instruction.vue"
</script>