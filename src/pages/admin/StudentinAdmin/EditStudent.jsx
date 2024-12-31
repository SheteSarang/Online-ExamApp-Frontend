import React, { useState } from "react";
import SideBar from "../SideBar";
import PasswordGenerator from "../PasswordGenerator";
import { CountryDropdown } from "react-country-region-selector";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const EditStudent = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [rollno, setRollno] = useState("");
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchStudentDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getstudent/${rollno}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setIsEditing(true);
        toast.success("Student details fetched successfully!", { position: "top-right" });
      } else {
        toast.error("Failed to fetch student details. Check the roll number.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      toast.error("An error occurred. Please try again later.", { position: "top-right" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the student details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/updatestudent/${rollno}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            Swal.fire("Updated!", "Student details have been updated.", "success");
            setFormData(null);
            setIsEditing(false);
            setRollno("");
          } else {
            Swal.fire("Error!", "Failed to update student details. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error updating student details:", error);
          Swal.fire("Error!", "An error occurred. Please try again later.", "error");
        }
      }
    });
  };

  const handleGeneratedPassword = (newPassword) => {
    setFormData((prevState) => ({
      ...prevState,
      password: newPassword,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prevState) => ({
      ...prevState,
      country: country,
    }));
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col min-h-screen items-center justify-start bg-teal-50">
        <Toaster position="top-right" reverseOrder={false} />
        <header className="w-full bg-teal-700 text-white py-4">
          <h2 className="text-2xl text-center font-bold">Welcome {adminName}</h2>
        </header>
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg mt-6">
          {!isEditing ? (
            <>
              <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
                Find Student by Roll No
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchStudentDetails();
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="rollno" className="block text-sm font-medium text-gray-700">
                    Roll No
                  </label>
                  <input
                    type="text"
                    id="rollno"
                    name="rollno"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Fetch Details
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
                Update Student Details
              </h1>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                      Surname
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <CountryDropdown
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <PasswordGenerator
                    initialLength={12}
                    initialNumberAllowed={true}
                    initialCharAllowed={true}
                    onPasswordChange={handleGeneratedPassword}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Update Details
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
