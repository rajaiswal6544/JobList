import { useForm } from "react-hook-form";
import axios from "axios";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function CreateJobForm() {
  const { register, handleSubmit, reset } = useForm({
    
  });
  const navigate = useNavigate(); 
  const onSubmit = async (data) => {
    const formattedData = {
      title: data.title,
      company: data.company,
      companyLogo: "https://example.com/default-logo.png", // Placeholder for now
      experience: "1-3 yr Exp", // Hardcoded, make dynamic if needed
      locationType: data.locationType, // Matches backend field
      salary: data.salary, // Sending only max salary as per backend format
      skills: ["Node.js", "React", "MongoDB", "AWS"], // Static skills for now
      description: data.description,
      jobType: data.jobType, // Matches backend field
    };
  
    console.log("Submitting job data:", formattedData);
  
    try {
      await axios.post("https://job-list-backend-e5eg9u47o-rajaiswal6544s-projects.vercel.app/api/jobs", formattedData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Job posted successfully!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error);
    }
  };
  
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">Create Job Opening</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Job Title</label>
              <input {...register("title")} type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-medium">Company Name</label>
              <input {...register("company")} type="text" className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Location</label>
              <select {...register("locationType")} className="w-full p-2 border rounded">
                <option value="">Choose Preferred Location</option>
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
            <div>
              <label className="block font-medium">Job Type</label>
              <select {...register("jobType")} className="w-full p-2 border rounded">
              <option value="Contract">Contract</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Salary Range</label>
              <div className="flex gap-2">
                <input {...register("minSalary")} type="number" className="w-full p-2 border rounded" />
                <input {...register("salary")} type="number" className="w-full p-2 border rounded" />
              </div>
            </div>
            <div>
              <label className="block font-medium">Application Deadline</label>
              <div className="relative">
                <input {...register("deadline")} type="date" className="w-full p-2 border rounded" />
                
              </div>
            </div>
          </div>
          <div>
            <label className="block font-medium">Job Description</label>
            <textarea {...register("description")} placeholder="Please share a description to let the candidate know more about the job role"
className="w-full p-2 border rounded"></textarea>
          </div>
          <div className="flex justify-between">
            <button type="button" className="px-4 py-2 border rounded">Save Draft ⌄</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Publish »</button>
          </div>
        </form>
      </div>
    </div>
  );
}