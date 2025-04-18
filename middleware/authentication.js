const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")
const User = require("../models/User")

const auth = (req, res, next) => {
  // check Header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid")
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid")
  }
}

module.exports = auth
