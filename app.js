require("dotenv").config()
require("express-async-errors")

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const express = require("express")
const app = express()

// import connectDB
const connectDB = require("./db/connect")

//  router import
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")

// error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const authenticationUser = require("./middleware/authentication")

app.use(express.json())
// extra packages

// routes
// Normal config will be  - "Domain/api/v1/jobs", "Domain/api/v1/jobs/:id"
app.use("/api/v1/auth", authRouter)
// Applying to all jobs route
app.use("/api/v1/jobs", authenticationUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.set("trust proxy", 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
