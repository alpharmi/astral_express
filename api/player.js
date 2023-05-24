function formatStatName(name) {
    return name.replaceAll(" ", "_").toLowerCase()
}

export default async function handler(req, res) {
    const uid = req.query.uid
    const formattedData = {}

    if (uid) {
        const playerData = await fetch(`https://api.mihomo.me/sr_info_parsed/${uid}?lang=en`).then(response => response.json())

        if (playerData) {
            formattedData.name = playerData.player.name
            formattedData.level = playerData.player.level
            formattedData.signature = playerData.player.signature
            formattedData.characters = []

            playerData.characters.forEach(character => {
                const formattedCharacter = {
                    name: character.name,
                    level: character.level,
                    relics: []
                }

                Object.values(character.relic).forEach(relic => {
                    const formattedRelic = {
                        name: relic.name,
                        level: relic.level,
                        main_stat: [formatStatName(relic.main_property.name), relic.main_property.value],
                        sub_stats: []
                    }

                    relic.sub_property.forEach(subStat => {
                        formattedRelic.sub_stats.push([formatStatName(subStat.name), subStat.value])
                    }) 

                    formattedCharacter.relics.push(formattedRelic)
                })

                formattedData.characters.push(formattedCharacter)
            })
        }
    }

    res.json(formattedData)
}