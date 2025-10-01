// components/admin/RequireAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  console.log("Token: ", token);
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

export default RequireAdmin;
