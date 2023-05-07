//serverless functions test
const { VercelRequest, VercelResponse } = require('@vercel/node')

export default async function handler(req, res) {
    res.end("test")
}