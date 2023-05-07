//serverless functions test
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(request: VercelRequest, response: VercelResponse) {
    response.end("test")
}