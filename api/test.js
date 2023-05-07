export default async function handler(req, res) {
    const response = await fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?")

    console.log(response)
    res.end("test")
}