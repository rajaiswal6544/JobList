const express = require("express");
const Job = require("../models/job");

const router = express.Router();

// Create Job
router.post("/jobs", async (req, res) => {
  try {
    const { title, company, companyLogo, experience, locationType, jobType ,salary, skills, description } = req.body;

    // Validation - Ensure required fields exist
    if (!title || !company  || !locationType || !salary|| !jobType) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const job = new Job({
      title,
      company,
      companyLogo,
      experience,
      locationType,
      salary,
      skills,
      jobType,
      description
    });

    await job.save();
    res.status(201).json({ message: "Job added successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Jobs
router.get("/jobs", async (req, res) => {
  try {
    let filters = {};

    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: "i" }; // Case-insensitive search
    }

    if (req.query.locationType) {
      filters.locationType = req.query.locationType;
    }

    if (req.query.experience) {
      filters.experience = req.query.experience;
    }
    if (req.query.jobType) {
      filters.jobType = { $regex: new RegExp(`^${req.query.jobType}$`, "i") };
    }
    

    if (req.query.minSalary && req.query.maxSalary) {
      filters.salary = { $gte: req.query.minSalary, $lte: req.query.maxSalary };
    }

    const jobs = await Job.find(filters);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
