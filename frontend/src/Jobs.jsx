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
      const response = await fetch(
        "https://job-list-rx6j.vercel.app/api/jobs?" + new URLSearchParams(filters),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Uncomment if authentication is required:
            // "Authorization": `Bearer YOUR_ACCESS_TOKEN`
          },
        }
      );

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
    const [minMonthly, maxMonthly] = newValue;
    setFilters({
      ...filters,
      minSalary: minMonthly * 12, // convert monthly to yearly
      maxSalary: maxMonthly * 12,
    });
  };

  // We'll also pass monthly values to the slider's `value`.
  const monthlyMin = filters.minSalary / 12;
  const monthlyMax = filters.maxSalary / 12;


  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 shadow-sm gap-4">
        {/* Title Filter */}
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

        {/* Location Filter */}
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

        {/* Job Type Filter */}
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

        {/* Salary Range Filter */}
        <div className="flex flex-col w-full md:w-1/4">
          <span className="text-sm font-medium text-gray-700">Salary Per Month</span>
          <BlackSlider
            value={[monthlyMin, monthlyMax]}
            onChange={handleSalaryChange}
            min={10000} // e.g. min monthly salary = 10,000
            max={200000} // e.g. max monthly salary = 200,000
            step={5000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
          />
          <span className="text-sm text-gray-500">
            ₹{monthlyMin.toLocaleString()} - ₹{monthlyMax.toLocaleString()} / month
          </span>
        </div>
      </div>

      {/* Job Cards */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg h-full flex flex-col justify-between relative"
            >
              {/* Time Posted in the top-right corner */}
              <span className="absolute top-2 right-2 text-xs text-black-600 bg-blue-300 px-2 py-1 rounded-md">
                {moment(job.postedAt).fromNow().replace("hours ago", "h ago")}
              </span>

              {/* Top: Logo, Title, Company Name (all left-aligned) */}
              <div>
                <img
                  src={`/${job.company}.png`}
                  alt={job.company}
                  className="w-12 h-12 rounded-full"
                />
                <h3 className="text-lg font-semibold mt-2">{job.title}</h3>
                
              </div>

              {/* Meta Info: Experience, Location, Salary */}
              <div className="mt-4 flex space-x-2 text-gray-600 text-sm">
                <Briefcase size={16} />
                <span>{job.experience}</span>

                <MapPin size={16} />
                <span>{job.locationType === "Remote" ? "Remote" : "Onsite"}</span>

                <Wallet size={16} />
                <span>{job.salary/100000}LPA</span>
              </div>

              {/* Short Description */}
              <ul className="mt-2 text-gray-600 text-sm list-disc list-inside overflow-hidden h-16">
                {job.description
                  .split("\n")
                  .slice(0, 3)
                  .map((line, idx) => (
                    <li key={idx} className="truncate">
                      {line}
                    </li>
                  ))}
                {job.description.split("\n").length > 3 && <li>...</li>}
              </ul>

              {/* Apply Button */}
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
