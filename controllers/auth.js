const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const { BadRequestError } = require("../errors")

const register = async (req, res) => {
  // const { password, name, email } = req.body
  // if (!password || !email || !name) {
  //   throw new BadRequestError("Pls provide email,password and name")
  // }
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
  res.send("login user")
}

module.exports = { register, login }
