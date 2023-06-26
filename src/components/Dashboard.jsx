import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const SellerDashboard = React.lazy(() => import("../pages/seller/SellerDashboard"));
const LandingPage = React.lazy(() => import("../pages/common/LandingPage"));

const Dashboard = ({handleRefresh}) => {
  const localStorageRole = localStorage.getItem("role");
  const role = useMemo(() => {
    return localStorage.getItem("role");
  }, [localStorageRole]);
  // const [role, setRole] = useState();
  // const localStorageRole = localStorage.getItem("role");
  // const location = useLocation()
  // console.log("location.state",location.state)
  // useEffect(() => {
  //   if(location.state){
  //     setRole(location.state.role)
  //   }
  //   if(!location.state){
  //   const localStorageRole = localStorage.getItem("role");
  //   setRole(localStorageRole);
  //   }
  // }, [location.state]);

  return (
    <Fragment>
      {role === "SELLER" && <SellerDashboard />} 
      {role === "BUYER" && <LandingPage handleRefresh={handleRefresh}/>}
      {role === "ADMIN" && <SellerDashboard />}
    </Fragment>
  );
};
export default Dashboard;
