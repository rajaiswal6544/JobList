import { useEffect, useState } from "react";
import axios from "axios";
import { Search, MapPin, Briefcase, Wallet } from "lucide-react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import moment from "moment";

const BlackSlider = styled(Slider)({
  color: "#000",
  "& .MuiSlider-thumb": {
    width: 16,
    height: 16,
  },
  "& .MuiSlider-track": {
    height: 4,
  },
  "& .MuiSlider-rail": {
    height: 4,
  },
});

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    locationType: "",
    jobType: "",
    minSalary: 1000000,
    maxSalary: 2000000,
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://job-list-backend-e5eg9u47o-rajaiswal6544s-projects.vercel.app/api/jobs?"+
        new URLSearchParams(filters), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Uncomment below if authentication is required
          // "Authorization": `Bearer YOUR_ACCESS_TOKEN`
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };
  

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters({ ...filters, minSalary: newValue[0], maxSalary: newValue[1] });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 shadow-sm gap-4">
        <div className="flex items-center border px-4 py-2 rounded w-full md:w-1/3 shadow-md">
          <Search className="mr-2 text-gray-500" />
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            className="outline-none w-full text-gray-700"
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex items-center border px-4 py-2 rounded w-full md:w-1/5 shadow-md">
          <MapPin className="mr-2 text-gray-500" />
          <select
            name="locationType"
            className="outline-none w-full text-gray-700"
            onChange={handleFilterChange}
          >
            <option value="">Preferred Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Delhi">Delhi</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Pune">Pune</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
            <option value="Indore">Indore</option>
            <option value="Gandhinagar">Gandhinagar</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="flex items-center border px-4 py-2 rounded w-full md:w-1/5 shadow-md">
          <Briefcase className="mr-2 text-gray-500" />
          <select
            name="jobType"
            className="outline-none w-full text-gray-700"
            onChange={handleFilterChange}
          >
            <option value="">Job type</option>
            <option value="Contract">Contract</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="flex flex-col w-full md:w-1/4">
          <span className="text-sm font-medium text-gray-700">Salary Per Year</span>
          <BlackSlider
            value={[filters.minSalary, filters.maxSalary]}
            onChange={handleSalaryChange}
            min={1000000}
            max={2000000}
            step={5000}
            valueLabelDisplay="auto"
          />
          <span className="text-sm text-gray-500">₹{filters.minSalary} - ₹{filters.maxSalary}</span>
        </div>
      </div>
      <div className="p-6 max-w-6xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
    {jobs.map((job, index) => (
      <div
        key={index}
        className="border p-4 rounded-lg shadow-lg h-full flex flex-col justify-between relative"
      >
       <span className="absolute top-2 right-2 text-xs text-black-600 bg-blue-300 px-2 py-1 rounded-md">
          {moment(job.postedAt).fromNow().replace("hours ago", "h ago")}
        </span>
        <div className="flex flex-col items-center">
          <img
            src={`/${job.company}.png`}
            alt={job.company}
            className="w-12 h-12 rounded-full"
          />
          <h3 className="text-lg font-semibold mt-2">{job.title}</h3>
        </div>
        <p className="text-gray-500 text-center">{job.company}</p>
        <div className="mt-4 flex space-x-2 text-gray-600 text-sm justify-center">
          <Briefcase size={16} /> <span>{job.experience}</span>
          <MapPin size={16} /> <span>{job.locationType === "Remote" ? "Remote" : "Onsite"}</span>
          <Wallet size={16} /> <span>₹{job.salary}</span>
        </div>
        <ul className="mt-2 text-gray-600 text-sm list-disc list-inside overflow-hidden h-16">
          {job.description.split("\n").slice(0, 3).map((line, index) => (
            <li key={index} className="truncate">{line}</li>
          ))}
          {job.description.split("\n").length > 3 && <li>...</li>}
        </ul>
        <button className="bg-blue-400 text-white p-3 rounded-lg w-full mt-2">
          Apply Now
        </button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
