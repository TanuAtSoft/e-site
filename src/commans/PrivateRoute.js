import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
//   let unixTimestamp = JSON.parse(localStorage.getItem("expireAt")) || 0;
//   const expireTime = new Date(unixTimestamp * 1000);
//   let currentTime = new Date();

  if (!token) {
    // not logged in so redirect
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
 
  // authorized so return child components
  return children;
};

export default PrivateRoute;