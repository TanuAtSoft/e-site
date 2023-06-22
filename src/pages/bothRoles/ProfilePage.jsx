import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { resetPassword } from "../../apis/profiles/resetPassword";

const theme = createTheme();

const ProfilePage = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [error, setError] = useState([]);

  const [details, setDetails] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleSubmit = async () => {
    if (details.newPassword === "") {
      setError([...error, "newPassword"]);
    }
    if (details.oldPassword === "") {
      setError([...error, "oldPassword"]);
    }
    if (details.oldPassword !== "" && details.newPassword !== "") {
      const res = await resetPassword(token, details);
      if (res.data.statusCode === 200) {
        alert(res.data.statusMessage);
      }
    } else {
      return;
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    details[name] = value;
    setDetails({ ...details });
    setError([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: "66vh", margin: "auto" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Change your password
          </Typography>
          <br />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={details.oldPassword}
              error={error.includes("oldPassword") ? true : false}
              margin="normal"
              required
              fullWidth
              id="old Password"
              label="Enter old Password"
              name="oldPassword"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              helperText={
                error.includes("oldPassword") ? "Incorrect entry." : ""
              }
            />
            <TextField
              value={details.newPassword}
              error={error.includes("newPassword") ? true : false}
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="enter New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeHandler}
              helperText={
                error.includes("newPassword") ? "password cannot be empty" : ""
              }
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default ProfilePage;
