const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const errorMiddleware = require("./middlewares/error.middleware")


const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)


const creditRoutes = require("./routes/credit.routes")
app.use("/credits", creditRoutes)
app.use(errorMiddleware)


module.exports = app