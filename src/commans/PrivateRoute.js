import React from "react";
import { useCookies } from "react-cookie";
import SubmitVerificationDetails from "../pages/seller/SubmitVerificationDetails"
import VerificationPending from "../pages/seller/VerificationPending"
const Login = React.lazy(() => import("../pages/common/SignIn"));


const PrivateRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const [cookies] = useCookies(["verified"]);
  //   let unixTimestamp = JSON.parse(localStorage.getItem("expireAt")) || 0;
  //   const expireTime = new Date(unixTimestamp * 1000);
  //   let currentTime = new Date();

  if (!token) {
    return <Login/>
  }
  else{
  if(role === "SELLER"){
    if(cookies.verified === "true"){
      return children;
    }
    if(cookies.verified === "false"){
      if(cookies.submittedVerDoc === "false"){
        return <SubmitVerificationDetails/>
      }
      if(cookies.submittedVerDoc === "true"){
        return <VerificationPending/>
      }

    }
  }
  else{
    return children
  }
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;
