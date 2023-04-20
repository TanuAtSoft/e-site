import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer"
import PrivateRoute from "./commans/PrivateRoute";

const Login = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const ProductDetails = React.lazy(()=> import("./pages/ProductDetails"))
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    
    <Router>
      <Header/>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={<Login />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<SignUp />}
          />
          <Route
            exact
            path="/"
            name="landing page"
            element={<LandingPage/>}
          />
          <Route
            path="/details/:id"
            name="Register Page"
            element={<ProductDetails/>}
          />
           <Route
            exact
            path="/forgot-password"
            name="Register Page"
            element={<ForgotPassword/>}
          />
          {/* <Route
            exact
            path="/password"
            name="Change Password"
            element={<ChangePass />}
          />
          <Route
            exact
            path="/login/forgot"
            name="Forgot Password"
            element={<ForgotPass />}
          />
          <Route
            exact
            path="/reset/:id"
            name="Reset Password"
            element={<ResetPassword />}
          /> */}

          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/seller"
            name="seller Dashboard"
            element={
              <PrivateRoute>
                <h1>This is seller dashboard</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
}

export default App;
