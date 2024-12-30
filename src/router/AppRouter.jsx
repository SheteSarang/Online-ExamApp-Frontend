// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSelection from "../pages/LoginSelection";
import UserDashboard from "../pages/student/UserDashboard";
import SideBar from "../pages/admin/SideBar";
import LoginWithNewAdmin from "../pages/admin/LoginWithNewAdmin";
import UserLogin from "../pages/student/UserLogin";
import  AddNewStudent  from "../pages/admin/AddNewStudent";
import AddNewAdmin from "../pages/admin/AddNewAdmin";
import AddTest from "../pages/admin/AddTest";
import FindResultOfOneStudent from "../pages/admin/FindResultOfOneStudent";
import ResultAnalysis from "../pages/admin/ResultAnalysis";
import Logout from "../pages/admin/Logout";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<SideBar />} />
        <Route path="/loginwithnewadmin" element={<LoginWithNewAdmin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/addnewstudent" element={<AddNewStudent />} />
        <Route path="/addnewadmin" element={<AddNewAdmin />} />
        <Route path="/addtest" element={<AddTest />} />
        <Route path="/findresultofonestudent" element={<FindResultOfOneStudent />} />
        <Route path="/resultanalysis" element={<ResultAnalysis />} />
        <Route path="/logout" element={<Logout />} />
       

      </Routes>
    </Router>
  );
};

export default AppRouter;
