const express = require("express")
const cors = require("cors")
//const rateLimit = require('express-rate-limit')
const app = express()

//const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 25})
const routes = [require("./routes/warps")]

app.use(cors())
app.use("/api", routes)

app.listen(3000)