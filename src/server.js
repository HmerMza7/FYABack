require("dotenv").config()
const app = require("./app")
const pool = require("./config/db")

const PORT = process.env.PORT || 3000

pool.query("SELECT 1")
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB error:", err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})