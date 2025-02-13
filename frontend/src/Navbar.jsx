import { useState } from "react";
import CreateJobForm from "./CreateJobForm";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-3 bg-white shadow-md rounded-full w-[90%] max-w-6xl mx-auto mt-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/image.png" // Replace with actual logo path
            alt="Logo"
            className="w-10 h-10"
          />
        </div>

        {/* Menu */}
        <ul className="flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-gray-900 cursor-pointer">Home</li>
          <li className="hover:text-gray-900 cursor-pointer">Find Jobs</li>
          <li className="hover:text-gray-900 cursor-pointer">Find Talents</li>
          <li className="hover:text-gray-900 cursor-pointer">About us</li>
          <li className="hover:text-gray-900 cursor-pointer">Testimonials</li>
        </ul>

        {/* Create Jobs Button */}
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium"
          onClick={() => navigate("/create")}
        >
          Create Jobs
        </button>
      </nav>
      {isOpen && <CreateJobForm isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Navbar;
