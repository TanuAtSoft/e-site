import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  return (
    <Container
      maxWidth="sm"
      style={{
        margin: "auto",
        height: "73vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h3" color="text.secondary" align="center">
        Successfully logged out
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        style={{ marginTop: "20px" }}
      >
        <Link to="/login">Go back to sign in page </Link>
      </Typography>
    </Container>
  );
};
export default LoggedOut;
