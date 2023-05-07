export default async function handler(req, res) {
    fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?").then(response => response.json()).then(data => {
        res.end(data)
    })
}