const express = require("express")
const router = express.Router()

const sleep = time => new Promise(res => setTimeout(res, time))

takumiQuery = new URLSearchParams({
    authkey_ver: 1,
    sign_type: 2,
    game_biz: "hkrpg_global",
    lang: "en",
    authkey: "",
    region: "",
    size: 20,
    gacha_type: 11,
    end_id: 0
})

router.get("/warps/importWarps", async (req, res) => {
    const authkey = req.query.authkey
    const region = req.query.region

    if (authkey && region) {
        const query = takumiQuery
        const warps = {characterWarps: {"1682521800004743708": ["Seele", "Character"]}}
        var last_id = 0

        query.set("authkey", authkey)
        query.set("region", region)

        /*
        while (true) {
            query.set("end_id", last_id)

            const warpData = await fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?" + query).then(response => response.json())
            const listLength = warpData.data.list.length - 1

            if (listLength > 0) {
                warpData.data.list.forEach(warp => {
                    warps.characterWarps[warp.id] = [warp.name, warp.item_type]
                })

                last_id = warpData.data.list[listLength].id
                await sleep(100)
            } else {
                break
            }
        }
        */

        res.json(warps)
    } else {
        res.json(null)
    }
})

module.exports = router