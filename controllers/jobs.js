const Job = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt")
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {
  res.send("get a single jobs")
}

const createJob = async (req, res) => {
  // automatically creating CreatedBy when job's created
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  res.send("update job")
}

const deleteJob = async (req, res) => {
  res.send("delete job")
}

module.exports = { getAllJobs, deleteJob, getJob, createJob, updateJob }
