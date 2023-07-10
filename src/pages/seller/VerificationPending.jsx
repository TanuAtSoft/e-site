import { Container, Typography } from "@mui/material";

const VerificationPending = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "75vh", textAlign: "center" }}
    >
      <Typography variant="h5">
        Verification is Pending from our side,Once it is verified you will be
        initmated about the same.
      </Typography>
      <br/>
      <Typography variant="body">
        Thank you for your patience!!
      </Typography>
    </Container>
  );
};

export default VerificationPending;
