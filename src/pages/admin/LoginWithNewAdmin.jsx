import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginWithNewAdmin = () => {
  const [isNewAdmin, setIsNewAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleExistingAdminLogin = (e) => {
    e.preventDefault();

    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    const existingAdmin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (existingAdmin) {
      alert("Login successful!");
      navigate("/admin"); // Navigate to Admin Dashboard
    } else {
      alert("Invalid credentials! Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  const handleAddNewAdmin = (e) => {
    e.preventDefault();

    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    admins.push({ email, password });
    localStorage.setItem("admins", JSON.stringify(admins));

    alert("New admin added successfully!");
    setEmail("");
    setPassword("");
    setIsNewAdmin(false); // Return to existing admin login form
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isNewAdmin ? "Add New Admin" : "Admin Login"}
      </h1>

      {!isNewAdmin ? (
        <form
          onSubmit={handleExistingAdminLogin}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsNewAdmin(true)}
              className="text-blue-500 hover:underline"
            >
              New Admin? Click here to register
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleAddNewAdmin}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Add Admin
          </button>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsNewAdmin(false)}
              className="text-blue-500 hover:underline"
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginWithNewAdmin;
