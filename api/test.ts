//serverless functions test
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(request: VercelRequest, response: VercelResponse) {
    fetch("https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?").then(data => {
        console.log(data)
        response.end("test")
    })
}