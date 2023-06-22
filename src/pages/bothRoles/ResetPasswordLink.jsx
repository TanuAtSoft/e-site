import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link} from "react-router-dom";
import { resetPasswordRequest } from "../../apis/profiles/resetPasswordRequest";
import { useParams } from "react-router-dom";
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

const ResetPasswordLink = () => {
  const [user, setUser] = useState({ password: "", confirmPassword: "" });
  const [perror, setPError] = useState(false);
  const [cperror, setCPError] = useState(false);
  const params =  useParams()
  const navigate = useNavigate()
  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    if (name === "password") {
      setPError(false);
    }
    if (name === "confirmPassword") {
      setCPError(false);
    }
    const value = e.target.value;
    user[name] = value;
    setUser({ ...user });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password === "") {
      setPError(true);
    }
    if (user.password === "") {
      setCPError(true);
    }

    if (user.password === "" || user.confirmPassword === "") {
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Password and Conform Password doesn't match");
      return;
    } else {
      const res = await resetPasswordRequest(params.token,{ newPassword: user.password });
     
      if (res.data?.statusCode  === 200) {
        alert(res.data.statusMessage);
        navigate("/login")
      }
      if(res.remote === "failure"){
        alert(res.errors.errors)
      }
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
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              error={perror}
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              helperText={perror ? "Invalid Entry" : ""}
            />
            <TextField
              margin="normal"
              error={cperror}
              required
              fullWidth
              id="confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              helperText={cperror ? "Invalid Entry" : ""}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default ResetPasswordLink;
