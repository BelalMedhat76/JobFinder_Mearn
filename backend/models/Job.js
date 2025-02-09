const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  jobType: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // ✅ Track applicants
});

module.exports = mongoose.model("Job", JobSchema);
