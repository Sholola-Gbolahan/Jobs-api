// JOB MODELS SETUP

const { required } = require("joi")
const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "decline", "pending"],
      default: "pending",
    },
    // Assigning Job to user who created it
    createdBy: {
      type: mongoose.Types.ObjectId,
      // tieing the Job to the user
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Job", JobSchema)
