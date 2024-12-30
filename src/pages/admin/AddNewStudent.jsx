import React, { useState } from "react";
import Sidebar from "./SideBar"; // Import the Sidebar component
import PasswordGenerator from "./PasswordGenerator"; // Import the PasswordGenerator component
import { CountryDropdown } from "react-country-region-selector"; // Import the CountryDropdown component

const AddNewStudent = () => {
  const [adminName, setAdminName] = useState("Admin"); // Placeholder for dynamic admin name
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    rollNo: "",
    email: "",
    password: "",
    country: "", // Add a country field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      [name]: value, // Dynamically update the formData field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Info:", formData);
  };

  const handleGeneratedPassword = (newPassword) => {
    setFormData((prevState) => ({
      ...prevState,
      password: newPassword, // Update the password field with the generated password
    }));
  };
  const handleCountryChange = (country) => {
    // Handle country change
    setFormData(() => ({
      country: country, // Update the country field of the FormData with the selected value
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen items-center justify-start bg-teal-50">
        {/* Header */}
        <header className="w-full bg-teal-700 text-white py-4">
          <h2 className="text-2xl text-center font-bold">Welcome {adminName}</h2>
        </header>

        {/* Form */}
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
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
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

            {/* Country Dropdown */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <CountryDropdown
                value={formData.country} // Bind the selected country value
                onChange={handleCountryChange} // Pass the selected country to the state
              />
            </div>

            {/* Password field with Password Generator */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center space-x-2">
                {/* Password Generator Component */}
                <PasswordGenerator
                  initialLength={12}
                  initialNumberAllowed={true}
                  initialCharAllowed={true}
                  onPasswordChange={handleGeneratedPassword} // Update the form's password field with the generated password
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
