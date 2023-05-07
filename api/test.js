export default async function handler(req, res) {
    const response = await fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?").then(response => response.json())
   
    res.json(response)
}