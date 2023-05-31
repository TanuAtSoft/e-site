import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Container,
  Button,
  TextField,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const orderStatus = ["INPROCESS", "SHIPPED", "INTRANSIT", "DELIVERED"];

const OrderModal = ({ open, handleClose, activeRow }) => {
  console.log("activeRow", activeRow);
  const [status, setStatus] = useState();
  const [shippingCompany, setShippingCompany] = useState();
  const [trackingNumber, setTrackingNumber] = useState();

  const handleCatChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };
  const onChangeHandler = (e) => {
    if (e.target.name === "shippingCompany") {
      setShippingCompany(e.target.value);
    }
    if (e.target.name === "trackingNumber") {
      setTrackingNumber(e.target.value);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change the status of the order
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          defaultValue="ordered"
          label="category"
          onChange={handleCatChange}
          sx={{ width: "100%" }}
        >
          {orderStatus.map((item, id) => {
            return (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {orderStatus.includes(status) && !status.includes("INPROCESS") && (
          <TextField
            value={shippingCompany}
            // error={errorFields.includes("email") ? true : false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="enter shipping company"
            name="shippingCompany"
            autoComplete="off"
            autoFocus
            onChange={onChangeHandler}
            //   helperText={
            //     errorFields.includes("email") ? "Incorrect entry." : ""
            //   }
          />
        )}
        {orderStatus.includes(status) && !status.includes("INPROCESS") && (
          <TextField
            value={trackingNumber}
            // error={errorFields.includes("email") ? true : false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="enter tracking number"
            name="trackingNumber"
            autoComplete="off"
            autoFocus
            onChange={onChangeHandler}
            //   helperText={
            //     errorFields.includes("email") ? "Incorrect entry." : ""
            //   }
          />
        )}
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", textAlign: "center" }}
        >
          <Button onClick={()=> handleClose()}>Cancel</Button>
          <Button onClick={()=> handleClose()}>Save</Button>
        </Container>
      </Box>
    </Modal>
  );
};
export default OrderModal;
