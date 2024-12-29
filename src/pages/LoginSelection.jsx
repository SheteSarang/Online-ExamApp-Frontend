import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to Online Exam Platform
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/userlogin")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login as User
        </button>
        <button
          onClick={() => navigate("/addnewadmin")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default LoginSelection;
