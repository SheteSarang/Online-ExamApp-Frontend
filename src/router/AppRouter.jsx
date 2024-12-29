// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSelection from "../pages/LoginSelection";
import UserDashboard from "../pages/student/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddNewAdmin from "../pages/admin/AddNewAdmin";
import UserLogin from "../pages/student/UserLogin";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addnewadmin" element={<AddNewAdmin />} />
        <Route path="/userlogin" element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
