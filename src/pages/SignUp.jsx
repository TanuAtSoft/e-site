import React, { Component }  from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../apis/signUp/signUp";

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

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isSeller: false,
  });
  const [errorFields, setErrorFields] = useState([]);

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === "firstName" || name === "lastName") {
      const re = /^[a-z\u0590-\u05fe\s]+$/i;
      if (value === "" || re.test(value)) {
        user[name] = value;
        setUser({ ...user });
      }
    } else {
      user[name] = value;
      setUser({ ...user });
    }
    setErrorFields(arrayRemove(errorFields, name));
  };

  const handleSubmit = async (e) => {
    if (user.firstName === "" || !/\S/.test(user.firstName)) {
      if (!errorFields.includes("firstName"))
        setErrorFields((prevState) => [...prevState, "firstName"]);
    }
    if (!user.firstName === "" || /\S/.test(user.firstName)) {
      setErrorFields(arrayRemove(errorFields, "firstName"));
    }
    if (user.lastName === "" || !/\S/.test(user.lastName)) {
      if (!errorFields.includes("lastName"))
        setErrorFields((prevState) => [...prevState, "lastName"]);
    }
    if (!user.lastName === "" || /\S/.test(user.lastName)) {
      setErrorFields(arrayRemove(errorFields, "lastName"));
    }
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
    } else {
      setErrorFields(arrayRemove(errorFields, "password"));
    }
    const testPass =
      user.firstName !== "" &&
      /\S/.test(user.firstName) &&
      user.email !== "" &&
      user.email.match(emailRegex) &&
      user.lastName !== "" &&
      /\S/.test(user.lastName) &&
      user.password !== "" &&
      /\S/.test(user.password);
    if (testPass) {
      const { data } = await signUp(user);
      setErrorFields([]);
      console.log("data", data);
      if (data.statusCode === 200) {
        navigate("/login");
      }
      alert(data.statusMessage);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorFields.includes("firstName") ? true : false}
                  autoComplete="off"
                  name="firstName"
                  required
                  fullWidth
                  value={user.firstName}
                  id="firstName"
                  label="First Name"
                  // autoFocus
                  onChange={onChangeHandler}
                  helperText={
                    errorFields.includes("firstName") ? "Incorrect entry." : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorFields.includes("lastName") ? true : false}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  value={user.lastName}
                  onChange={onChangeHandler}
                  helperText={
                    errorFields.includes("lastName") ? "Incorrect entry." : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorFields.includes("email") ? true : false}
                  type={"email"}
                  value={user.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={onChangeHandler}
                  helperText={
                    errorFields.includes("email") ? "Incorrect email." : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorFields.includes("password") ? true : false}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                  helperText={
                    errorFields.includes("password")
                      ? "Password cannot be emty"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      value={user.isSeller}
                      onChange={() => {
                        user.isSeller = !user.isSeller;
                      }}
                    />
                  }
                  label="Tick if you are a seller"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default SignUp;
