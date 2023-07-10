import React from "react";
import { useNavigate } from "react-router-dom";
const Login = React.lazy(() => import("../pages/common/SignIn"));

const PrivateRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  //   let unixTimestamp = JSON.parse(localStorage.getItem("expireAt")) || 0;
  //   const expireTime = new Date(unixTimestamp * 1000);
  //   let currentTime = new Date();

  if (!token) {
    return <Login/>
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
