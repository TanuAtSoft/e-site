import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./commans/PrivateRoute";
import Dashboard from "./components/Dashboard";
import { getCartLength } from "./apis/carts/getCartLength";
import { getWishlistLength } from "./apis/wishlist/getWishlistLength";

const Login = React.lazy(() => import("./pages/common/SignIn"));
const SignUp = React.lazy(() => import("./pages/common/SignUp"));
const ForgotPassword = React.lazy(() =>
  import("./pages/common/ForgotPassword")
);
const ProductDetails = React.lazy(() =>
  import("./pages/common/ProductDetails")
);
const AddProduct = React.lazy(() => import("./pages/seller/AddProduct"));
const LoggedOut = React.lazy(() => import("./pages/common/LoggedOut"));
const ViewCart = React.lazy(() => import("./pages/buyer/ViewCart"));
const Orders = React.lazy(() => import("./pages/buyer/Orders"));
const WishlistPage = React.lazy(() => import("./pages/buyer/Wishlist"));
const ManageProducts = React.lazy(()=> import("./pages/seller/ManageProducts"))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  const [cart, setCart] = useState();
  const [wishlist, setWishlist] = useState();
  let token = JSON.parse(localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(false);
  const role = localStorage.getItem("role");

  const handleCartCount = (count) => {
    setCart(count);
  };
  const handleWsihlistCount = (count) => {
    setWishlist(count);
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    if (token && role === "BUYER") {
      const fetchNumbers = async () => {
        const cartRes = await getCartLength(token);
        if (cartRes.data.data > 0) {
          setCart(cartRes.data.data);
        }
        const wishlistRes = await getWishlistLength(token);
        if (wishlistRes.data.data > 0) {
          setWishlist(wishlistRes.data.data);
        }
      };
      fetchNumbers();
    }
  }, [token, refresh]);
  return (
    <Router>
      <Header
        wishlist={wishlist}
        cart={cart}
        handleCartCount={handleCartCount}
        handleWsihlistCount={handleWsihlistCount}
      />
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <Login
                handleCartCount={handleCartCount}
                handleWsihlistCount={handleWsihlistCount}
              />
            }
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
            name="dashboard"
            element={<Dashboard handleRefresh={handleRefresh} />}
          />
          <Route
            path="/details/:id"
            name="Register Page"
            element={
              <ProductDetails
                handleRefresh={handleRefresh}
                fromWishlist={false}
              />
            }
          />
          <Route
            exact
            path="/forgot-password"
            name="Register Page"
            element={<ForgotPassword />}
          />
          <Route
            exact
            path="/loggedOut"
            name="logged out"
            element={<LoggedOut handleRefresh />}
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
            path="/addProduct"
            name="add product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
           <Route
            path="/manageProducts"
            name="manage products"
            element={
              <PrivateRoute>
                <ManageProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            name="cart"
            element={
              <PrivateRoute>
                <ViewCart handleRefresh={handleRefresh} />
              </PrivateRoute>
            }
          />

          <Route
            path="/wishlist"
            name="wishlist"
            element={
              <PrivateRoute>
                <WishlistPage handleRefresh={handleRefresh} />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist/details/:id"
            name="wishlist details"
            element={
              <ProductDetails
                handleRefresh={handleRefresh}
                fromWishlist={true}
                handleWsihlistCount={handleWsihlistCount}
              />
            }
          />
          <Route
            path="/orders"
            name="orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
