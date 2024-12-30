import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaChevronLeft,
  FaUserCircle,  // New icon for Student
  FaTasks,      // New icon for Test
  FaUserShield,
  FaSearch,
  FaChartBar,
  FaSignOutAlt,
  FaPlus,       // Icon for Add
  FaEdit,       // Icon for Edit
  FaTrash,      // Icon for Delete
} from "react-icons/fa";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const expandSidebar = () => {
    if (!isSidebarOpen) setIsSidebarOpen(true);
  };

  // Function to check if the current route is active
  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  // Toggle student dropdown
  const toggleStudentMenu = () => {
    setIsStudentOpen(!isStudentOpen);
  };

  // Toggle test dropdown
  const toggleTestMenu = () => {
    setIsTestOpen(!isTestOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white flex flex-col justify-between transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <span className="text-xl font-bold">Admin</span>}
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
            {/* Student */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive("/student")}`}
              onClick={() => {
                expandSidebar();
                toggleStudentMenu();
              }}
            >
              <FaUserCircle
                size={20}
                className={`${!isSidebarOpen ? "text-gray-400" : ""}`} // Greying out when collapsed
              />
              {isSidebarOpen && <span>Student</span>}
            </li>
            {isStudentOpen && (
              <ul className="ml-4 space-y-2">
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/addnewstudent")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/addnewstudent");
                  }}
                >
                  <FaPlus size={20} />
                  {isSidebarOpen && <span>Add a New Student</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/editstudent")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/editstudent");
                  }}
                >
                  <FaEdit size={20} />
                  {isSidebarOpen && <span>Edit Student's Info</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/deletestudent")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/deletestudent");
                  }}
                >
                  <FaTrash size={20} />
                  {isSidebarOpen && <span>Delete Student</span>}
                </li>
              </ul>
            )}

            {/* Add New Admin */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive("/addnewadmin")}`}
              onClick={() => {
                expandSidebar();
                navigate("/addnewadmin");
              }}
            >
              <FaUserShield
                size={20}
                className={`${!isSidebarOpen ? "text-gray-400" : ""}`} // Greying out when collapsed
              />
              {isSidebarOpen && <span>Add a New Admin</span>}
            </li>

            {/* Test */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive("/test")}`}
              onClick={() => {
                expandSidebar();
                toggleTestMenu();
              }}
            >
              <FaTasks
                size={20}
                className={`${!isSidebarOpen ? "text-gray-400" : ""}`} // Greying out when collapsed
              />
              {isSidebarOpen && <span>Test</span>}
            </li>
            {isTestOpen && (
              <ul className="ml-4 space-y-2">
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/addtest")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/addtest");
                  }}
                >
                  <FaPlus size={20} />
                  {isSidebarOpen && <span>Add a New Test</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/edittest")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/edittest");
                  }}
                >
                  <FaEdit size={20} />
                  {isSidebarOpen && <span>Edit Test</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive("/deletetest")}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/deletetest");
                  }}
                >
                  <FaTrash size={20} />
                  {isSidebarOpen && <span>Delete Test</span>}
                </li>
              </ul>
            )}

            {/* Find a Result */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive("/findresultofonestudent")}`}
              onClick={() => {
                expandSidebar();
                navigate("/findresultofonestudent");
              }}
            >
              <FaSearch size={20} />
              {isSidebarOpen && <span>Find a Result</span>}
            </li>

            {/* Result Analysis */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive("/resultanalysis")}`}
              onClick={() => {
                expandSidebar();
                navigate("/resultanalysis");
              }}
            >
              <FaChartBar size={20} />
              {isSidebarOpen && <span>Result Analysis</span>}
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            className={`w-full ${isSidebarOpen ? "p-4" : "p-2"} hover:bg-gray-700 cursor-pointer flex items-center ${
              isSidebarOpen ? "space-x-2" : "justify-center"
            } ${isActive("/logout")}`}
            onClick={() => {
              expandSidebar();
              navigate("/logout");
            }}
          >
            <FaSignOutAlt
              size={20}
              className={`${!isSidebarOpen ? "text-gray-400" : ""}`} // Greying out when collapsed
            />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
