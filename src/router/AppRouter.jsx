// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSelection from "../pages/LoginSelection";
import UserDashboard from "../pages/student/UserDashboard";
import SideBar from "../pages/admin/SideBar";
import LoginWithNewAdmin from "../pages/admin/LoginWithNewAdmin";
import UserLogin from "../pages/student/UserLogin";

import AddNewAdmin from "../pages/admin/AdminInAdmin/AddNewAdmin";
import AddTest from "../pages/admin/TestInAdmin/AddTest";
import FindResultOfOneStudent from "../pages/admin/FindResultInAdmin/FindResultOfOneStudent";
import ResultAnalysis from "../pages/admin/ResultAnalysysInAdmin/ResultAnalysis";
import Logout from "../pages/admin/LogoutInAdmin/Logout";

//Admin Imports

//Student in admin Imports
import  AddNewStudent  from "../pages/admin/StudentinAdmin/AddNewStudent";
import EditStudent from "../pages/admin/StudentinAdmin/EditStudent";
import DeleteStudent from "../pages/admin/StudentinAdmin/DeleteStudent";
//--Student in admin Imports


//--Admin Imports
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
        <Route path="/editstudent" element={<EditStudent />} />
        <Route path="/deletestudent" element={<DeleteStudent />} />
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
