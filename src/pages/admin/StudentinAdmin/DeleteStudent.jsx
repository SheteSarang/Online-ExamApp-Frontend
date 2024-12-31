import React, { useState } from "react";
import SideBar from "../SideBar";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Toaster, toast } from "react-hot-toast";

const DeleteStudent = () => {
  const [rollNo, setRollNo] = useState(""); // Store roll number
  const [student, setStudent] = useState(null); // Store fetched student details

  // Handle change of roll number input
  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  // Fetch student details by roll number
  const fetchStudentDetails = async () => {
    if (!rollNo.trim()) {
      toast.error("Please enter a roll number.");
      return;
    }

    const response = await fetch(`http://localhost:5000/getstudent/${rollNo}`);
    if (response.ok) {
      const student = await response.json();
      if (student) {
        setStudent(student); // Set fetched student data
        toast.success("Student details fetched successfully!");
      } else {
        toast.error("No student found with this roll number.");
      }
    } else {
      toast.error("Failed to fetch student details. Check the roll number.");
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!student) {
      toast.error("No student data available for deletion.");
      return;
    }

    const sweetalertdata = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (sweetalertdata.isConfirmed) {  //isconfirm is part of sweet alert
      const response = await fetch(`http://localhost:5000/deletestudent/${rollNo}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire("Deleted!", "The student has been deleted.", "success");
        setStudent(null); // Reset student data after deletion
        setRollNo(""); // Clear the roll number input
      } else {
        Swal.fire("Failed!", "Failed to delete the student.", "error");
      }
    }
  };

  // Render student information once fetched
  const renderStudentInfo = () => {
    if (!student) return null;

    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Student Information</h2>
        <p><strong>Name:</strong> {student.name} {student.surname}</p>
        <p><strong>Roll No:</strong> {student.rollno}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Country:</strong> {student.country}</p>
        <button
          onClick={handleDelete}
          className="w-full mt-6 py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Student
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col min-h-screen items-center justify-start bg-teal-50">
        <Toaster position="top-right" reverseOrder={false} />
        <header className="w-full bg-teal-700 text-white py-4">
          <h2 className="text-2xl text-center font-bold">Delete Student</h2>
        </header>

        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg mt-6">
          {!student ? (
            <>
              <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
                Delete Student
              </h1>
              <div className="space-y-4">
                <input
                  type="text"
                  value={rollNo}
                  onChange={handleRollNoChange}
                  placeholder="Enter Roll No"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                />
                <button
                  onClick={fetchStudentDetails}
                  className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Fetch Student Details
                </button>
              </div>
            </>
          ) : (
            renderStudentInfo()
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
