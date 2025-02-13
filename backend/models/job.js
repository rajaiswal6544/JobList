const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Job title (e.g., Full Stack Developer)
  company: { type: String, required: true }, // Company name
  companyLogo: { type: String }, // Company logo URL
  experience: { type: String, required: true }, // Experience range (e.g., "1-3 yr Exp")
  locationType: { 
    type: String, 
    enum: ["Remote", "Kolkata", "Hyderabad", "Ahmedabad", "Delhi", "Bangalore", "Chennai", "Pune", "Jaipur", "Chandigarh", "Gurgaon", "Noida", "Indore", "Gandhinagar"], 
    required: true 
  }, // Job location
  salary: { type: Number, required: true }, // Salary in LPA
  skills: [{ type: String }], // Array of required skills (e.g., ["Node.js", "MongoDB"])
  jobType: { 
    type: String, 
    enum: ["Internship", "Part-time", "Full-time", "Contract"], 
    required: true 
  }, // Type of job
  description: { type: String }, // Job description
  postedAt: { type: Date, default: Date.now }, // Date of posting
});

module.exports = mongoose.model("Job", jobSchema);

