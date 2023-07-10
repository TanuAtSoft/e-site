import { Fragment, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { verifyUser } from "../../apis/admin/verifyUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const params = useParams();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleVerifyAccount = async () => {
    const res = await verifyUser(params.token);
    if (res.data.statusCode === 200) {
      alert(res.data.statusMessage);
      setDone(true);
    }
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      {!done && (
        <Button onClick={handleVerifyAccount}>Verify Your account</Button>
      )}
      {done && (
        <Fragment>
          <Typography>Your Account is verified.Go to Login Page</Typography>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Fragment>
      )}
    </Container>
  );
};
export default VerifyAccount;
