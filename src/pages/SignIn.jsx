import React, { Component }  from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../apis/signIn/signIn";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errorFields, setErrorFields] = useState([]);
  const navigate = useNavigate();

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    user[name] = value;
    setUser({ ...user });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (user.email === "" || !user.email.match(emailRegex)) {
      if (!errorFields.includes("email"))
        setErrorFields((prevState) => [...prevState, "email"]);
    }
    if (!user.email === "" || user.email.match(emailRegex)) {
      setErrorFields(arrayRemove(errorFields, "email"));
    }
    if (user.password === "" || !/\S/.test(user.password)) {
      if (!errorFields.includes("password"))
        setErrorFields((prevState) => [...prevState, "password"]);
    }
    if (!user.password === "" || /\S/.test(user.password)) {
      setErrorFields(arrayRemove(errorFields, "password"));
    }
    const testPass =
      user.email !== "" &&
      user.email.match(emailRegex) &&
      user.password !== "" &&
      /\S/.test(user.password);
    if (testPass) {
      const res = await signIn(JSON.stringify(user));
      // console.log(res);
      if (res?.data?.statusCode === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.data.user.token));
        localStorage.setItem("user", JSON.stringify(res.data.data.user.user));
        localStorage.setItem("role", JSON.stringify(res.data.data.user.role));
        // localStorage.setItem(
        //   "expireAt",
        //   JSON.stringify(res.data.data.tokenExpireAt)
        // );
        if(res.data.data.user.role === "BUYER"){
          navigate("/");
        }
        if(res.data.data.user.role === "SELLER"){
          navigate("/seller");
        }
       
      } else if (res.remote === "failure") {
        alert(res.errors.errors);
      }
      setErrorFields([]);
    } else {
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={user.email}
              error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              helperText={
                errorFields.includes("email") ? "Incorrect entry." : ""
              }
            />
            <TextField
              value={user.password}
              error={errorFields.includes("password") ? true : false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
              helperText={
                errorFields.includes("password")
                  ? "password cannot be empty"
                  : ""
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignIn;
