const sleep = time => new Promise(res => setTimeout(res, time))

const takumiQuery = new URLSearchParams({
    authkey_ver: 1,
    sign_type: 2,
    game_biz: "hkrpg_global",
    lang: "en",
    authkey: "",
    region: "",
    gacha_type: 0,
    size: 20,
    end_id: 0
})

export default async function handler(req, res) {
    const authkey = req.query.authkey
    const region = req.query.region
    const gachaType = req.query.gacha_type
    const lastId = req.query.last_id
    var warps = []

    if (authkey && region && gachaType && lastId) {
        const query = takumiQuery
        var last_id = 0
        var latest = true

        query.set("authkey", authkey)
        query.set("region", region)
        query.set("gacha_type", gachaType)

        while (true) {
            query.set("end_id", last_id)

            const warpData = await fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?" + query).then(response => response.json())
            //const warpData = null

            if (warpData && warpData.data) {
                const listLength = warpData.data.list.length - 1

                if (listLength > 0 && latest) {
                    warpData.data.list.forEach(warp => {
                        if (warp.id != lastId && latest) {
                            warps.push([warp.id, warp.name.toLowerCase().replaceAll(" ", "_"), warp.item_type.toLowerCase().replaceAll(" ", "_"), warp.time])
                        } else {
                            latest = false
                        }
                    })

                    last_id = warpData.data.list[listLength].id
                    await sleep(500)
                } else {
                    break
                }
            } else {
                break
            }
        }
    }

    res.json(warps)
}