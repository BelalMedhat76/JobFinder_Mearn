const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a Job (Only Logged-in Users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;
    const newJob = new Job({ title, description, company, location, salary, jobType, postedBy: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get Applicants for a Job (Only Job Owner)
router.get("/:id/applicants", authMiddleware, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("applicants", "name email");
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      // Ensure only the job owner can see the applicants
      if (job.postedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      res.json(job.applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
 
router.post("/:id/apply", authMiddleware, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Job not found" });
  
      // Prevent duplicate applications
      if (job.applicants.includes(req.user.id)) {
        return res.status(400).json({ message: "You have already applied for this job" });
      }
  
      // Add applicant to the job
      job.applicants.push(req.user.id);
      await job.save();
  
      res.json({ message: "Application submitted successfully!" });
    } catch (error) {
      console.error("Apply Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
router.get("/my-applications", authMiddleware, async (req, res) => {
    try {
      const jobs = await Job.find({ applicants: req.user.id }).populate("postedBy", "name email");
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
router.post("/:id/apply", authMiddleware, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Ensure user doesn't apply twice (Optional)
      if (!job.applicants) {
        job.applicants = [];
      }
      if (job.applicants.includes(req.user.id)) {
        return res.status(400).json({ message: "You already applied for this job" });
      }
  
      // Save application
      job.applicants.push(req.user.id);
      await job.save();
  
      res.status(200).json({ message: "Application successful!" });
    } catch (error) {
      console.error("Error applying for job:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
// ✅ Make sure jobs have 'postedBy' populated in job routes
router.get("/", async (req, res) => {
    try {
      const jobs = await Job.find().populate("postedBy", "_id name email"); // ✅ Populate user details
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
// ✅ Get a Single Job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a Job (Only Owner)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a Job (Only Owner)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.remove();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
