import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { CountryDropdown } from "react-country-region-selector";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const FindStudentInfo = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [students, setStudents] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const fetchStudents = async () => {
    if (selectedCountry) {
      try {
        const response = await fetch(
          `http://localhost:5000/studentsfrom/${selectedCountry}`
        );
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          toast.error("Failed to fetch students. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const deleteStudent = async (rollno) => {
    try {
      const response = await fetch(
        `http://localhost:5000/deletestudent/${rollno}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        toast.success("Student deleted successfully!");
        fetchStudents(); // Refresh the student list
      } else {
        toast.error("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const updateStudent = (rollno) => {
    // Implement your update logic, like navigating to an update page or showing a modal
    console.log(`Updating student with rollno: ${rollno}`);
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchStudents();
    }
  }, [selectedCountry]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col min-h-screen items-center justify-start bg-teal-50">
        <Toaster position="top-right" reverseOrder={false} />
        <header className="w-full bg-teal-700 text-white py-4">
          <h2 className="text-2xl text-center font-bold">Welcome {adminName}</h2>
        </header>
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg mt-6">
          <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
            Find Student Info
          </h1>
          <div className="mb-6">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Select Country
            </label>
            <CountryDropdown
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
            />
          </div>

          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-bold">Roll No</div>
                <div className="font-bold">Name</div>
                <div className="font-bold">Country</div>
                <div className="font-bold">Actions</div>
              </div>
              {students.map((student, index) => (
                <div
                  key={student.rollno}
                  className="grid grid-cols-4 gap-4 py-3 border-b"
                  onMouseEnter={() => setHoveredRow(student.rollno)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div>{student.rollno}</div>
                  <div>{student.name}</div>
                  <div>{student.country}</div>
                  <div className="flex space-x-2">
                    <FaEdit
                      onClick={() => updateStudent(student.rollno)}
                      className={`cursor-pointer text-blue-600 ${
                        hoveredRow === student.rollno ? "block" : "hidden"
                      }`}
                      title="Edit"
                    />
                    <FaTrash
                      onClick={() => deleteStudent(student.rollno)}
                      className={`cursor-pointer text-red-600 ${
                        hoveredRow === student.rollno ? "block" : "hidden"
                      }`}
                      title="Delete"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            selectedCountry && (
              <p className="text-center text-gray-600">
                No students found from {selectedCountry}.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FindStudentInfo;
