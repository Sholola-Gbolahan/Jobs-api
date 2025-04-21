require("dotenv").config()
require("express-async-errors")
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
