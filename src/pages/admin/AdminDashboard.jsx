// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { FaBars, FaChevronLeft } from "react-icons/fa"; // Import icons from react-icons

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <span
            className={`text-xl font-bold ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin
          </span>
          <button
            className="text-gray-300 p-2 focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Sidebar Options */}
        <div className="flex-grow">
          <ul className="mt-4 space-y-2">
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Add a Student
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Add a New Admin
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Add a Test</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Find a Result of a Particular Student
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome, admin! You can create and manage exams here.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
