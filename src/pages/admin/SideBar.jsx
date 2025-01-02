import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaChevronLeft,
  FaUserCircle,
  FaTasks,
  FaUserShield,
  FaSearch,
  FaChartBar,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isStudentOpen, setIsStudentOpen] = useState(false); // similarly for isTestOpen
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Expand Sidebar (when collapsed)
  const expandSidebar = () => {
    if (!isSidebarOpen) setIsSidebarOpen(true);
  };

  // Update activePath when the route changes
  useEffect(() => {
    setActivePath(location.pathname);
    // Automatically open dropdowns based on active route
    if (location.pathname.includes("/addnewstudent") || location.pathname.includes("/editstudent") || location.pathname.includes("/deletestudent") ) {
      setIsStudentOpen(true);
    } else {
      setIsStudentOpen(false);
    }

    if (location.pathname.includes("/test")) {
      setIsTestOpen(true);
    } else {
      setIsTestOpen(false);
    }
  }, [location.pathname]);

  // Function to check if the current route is active
  const isActive = (path) => (activePath === path ? "bg-gray-700" : "");

  // Toggle Student Dropdown
  const toggleStudentMenu = () => {
    setIsStudentOpen(!isStudentOpen);
  };

  // Toggle Test Dropdown
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
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/student"
              )}`}
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
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/addnewstudent"
                  )}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/addnewstudent");
                  }}
                >
                  <FaPlus size={20} />
                  {isSidebarOpen && <span>Add a New Student</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/editstudent"
                  )}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/editstudent");
                  }}
                >
                  <FaEdit size={20} />
                  {isSidebarOpen && <span>Edit Student's Info</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/deletestudent"
                  )}`}
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
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/addnewadmin"
              )}`}
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
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/test"
              )}`}
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
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/addtest"
                  )}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/addtest");
                  }}
                >
                  <FaPlus size={20} />
                  {isSidebarOpen && <span>Add a New Test</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/edittest"
                  )}`}
                  onClick={() => {
                    expandSidebar();
                    navigate("/edittest");
                  }}
                >
                  <FaEdit size={20} />
                  {isSidebarOpen && <span>Edit Test</span>}
                </li>
                <li
                  className={`p-4 hover:bg-gray-700 cursor-pointer ${isActive(
                    "/deletetest"
                  )}`}
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
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/findresultofonestudent"
              )}`}
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
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/resultanalysis"
              )}`}
              onClick={() => {
                expandSidebar();
                navigate("/resultanalysis");
              }}
            >
              <FaChartBar size={20} />
              {isSidebarOpen && <span>Result Analysis</span>}
            </li>

            {/* Find Student Info */}
            <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center space-x-2 ${isActive(
                "/findstudentsinfo"
              )}`}
              onClick={() => {
                expandSidebar();
                navigate("/findstudentsinfo");
              }}
            >
              <FaSearch size={20} />
              {isSidebarOpen && <span>Find Student Info</span>}
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
              className={`${!isSidebarOpen ? "text-gray-400" : ""}`}
            />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
