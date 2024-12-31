import React, { useState } from "react";
import SideBar from "../SideBar";
import PasswordGenerator from "../PasswordGenerator";
import { CountryDropdown } from "react-country-region-selector";
import toast, { Toaster } from "react-hot-toast";

const AddNewStudent = () => {
  const [adminName, setAdminName] = useState("Admin");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    rollno: "",
    email: "",
    password: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.warn("Form data:", formData);
    try {
      const response = await fetch("http://localhost:5000/addnewstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Student added successfully!");
        setFormData({
          name: "",
          surname: "",
          rollno: "",
          email: "",
          password: "",
          country: "",
        });
      } else {
        toast.error("Failed to add student. Please try again.");
        console.warn('HTTP Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("An error occurred. Please try again later.");
    }
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
          <h1 className="text-2xl font-bold text-center text-teal-600 mb-6">
            Add New Student
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
                Roll No
              </label>
              <input
                type="text"
                id="rollno"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-3 py-2"
              />
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
              <div className="flex items-center space-x-2">
                <PasswordGenerator
                  initialLength={12}
                  initialNumberAllowed={true}
                  initialCharAllowed={true}
                  onPasswordChange={handleGeneratedPassword}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudent;
