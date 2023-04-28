const express = require("express")
//const cors = require("cors")
//const rateLimit = require('express-rate-limit')
const app = express()

//const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 25})
app.get("/test", (req, res) => {
    res.send("Hello!")
})

//app.use(cors())
app.listen(3000) //Change port to your liking

//Express.js backend / api running on localhost:3000