<template>
    <div class="flex flex-col w-full">
        <h1 class="text-4xl pb-2 text-title font-bold">Import Warps</h1>
        <p class="pb-2">Follow the steps below to import your warp history <br> from Honkai: Star Rail.</p>
        <Split/>
        <div class="flex flex-col gap-3">
            <Instruction number="1" description="Open Honkai: Star Rail on PC."/>
            <Instruction number="2" description="Open your Warp History and go to the Records tab."/>
            <Instruction number="3" description="Open Windows PowerShell and paste the following command."/>
            <div class="flex flex-row">
                <div class="ml-10 h-auto p-5 bg-container border-[1px] flex flex-row gap-3 items-center border-[#000000] border-opacity-50 rounded-xl">
                    <button @click="copytoclipboard" class="h-full">
                        <svg viewBox="0 0 24 24" style=" width:1.5rem; height:1.5rem; fill:white;" class=" svelte-1mzwbk9"><path id="copySvg" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                    </button>
                    <p id="copyCommand">Start-Process powershell -Verb runAs -ArgumentList '-NoExit -Command "Invoke-Expression (New-Object Net.WebClient).DownloadString(\"https://raw.githubusercontent.com/alpharmi/astral_express/main/getwarps.ps1\")"'</p>
                </div>
            </div>
            <Instruction number="4" description="Paste the URL that was copied into the box below."/>
            <input id="warpURL" type="text" placeholder="Paste warp URL here" class="ml-10 h-auto p-2 w-72 placeholder-neutral-500 bg-container border-[1px] border-[#000000] border-opacity-50 rounded-xl"/>
            <button @click="importWarps" class="buttonThin ml-10 w-72 h-12 text-center pb-3">Import</button>
        </div>
    </div>
</template>

<script>
    export default {
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
            importWarps() {
                //const warpURL = document.getElementById("warpURL").value
                const warpURL = "https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&win_mode=fullscreen&gacha_id=dbebc8d9fbb0d4ffa067423482ce505bc5ea&timestamp=1681910018&region=prod_official_asia&default_gacha_type=11&lang=en&authkey=SOIw202%2F0SubUiSlCe4kr2fWc2Vab9c6WLgC1qjIj%2FSZNsPoW3pw03u16%2ByJr%2F2KTa1I5JZUlITJ5l1Lubu2zIohEfOnStwObWTxLdHfhGZf4PHiJLYqDCP5KU8M8j8uqhZyFzv5XCzF8QXfrEpCFnL41zFsVVsDcqHEQAKp%2F8NYPBD8qZRGRf%2FfNPhwPr1pDSOqaVA1ng9XGfC%2Bddo02rr9xDLd%2BuO0ML1o3fCE90nnysqjBYL5UJ14ZQ%2FvA9CkINoALCEt3DosYF%2BKIb%2BhNSOrOpRzvjKcnHXDPLSz4gKssv9T%2FnCk1LGTKnWys4MVKtUgad8RomSTYddT5bZR7iBY36czLAno142dFpiKtY2RTRyROdWPqwvjCs4ReNajAex%2BSsN9pTdYZPUu0DRTsNYGWexsdvsRFx1j5xx1hy8i6vo4AgMIEUcCC8VWGG%2Fowu3Teef%2BOEmkhCLydMjr7iof%2B6v8s58MqdfxL342Z6b798yAqbY%2FruIuUvpjasR3hZhRsfJl37gOgQODhJezbLAoAhujJq5XW0Dkww1wdFGyroFy69mRtO0k1YZJMiCunEjhqLbAz%2BVStm482LNai45WH%2Ff1MyO2a32JwFYWXHozrvOVLHR9K1wiMOSVbRjE2C%2FNbWXulpqsRdciOqkwqngs%2BWWMXS5lWe79YK4cgN4%3D&game_biz=hkrpg_global&os_system=Windows%2010%20%20%2810.0.19044%29%2064bit&device_model=B360%20AORUS%20GAMING%203%20%28Gigabyte%20Technology%20Co.%2C%20Ltd.%29&plat_type=pc&page=1&size=5&gacha_type=11&end_id=0"
            
                if (warpURL.startsWith("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog")) {
                    const authkey = warpURL.split("&authkey=")[1].split("&game_biz=")[0].replaceAll("%2F", "/").replaceAll("%2B", "+").replaceAll("%3D", "=")
                    const region = warpURL.split("&region=")[1].split("&default_gacha_type=")[0]

                    fetch("http://localhost:3000/api/warps/importWarps?" + new URLSearchParams({
                        authkey: authkey,
                        region: region
                    })).then(response => response.json()).then(data => {
                        localStorage.setItem("warps", JSON.stringify(data))        
                    })
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