import { useEffect, useState } from "react";
import { updateOrderInfo } from "../apis/orders/updateOrderInfo";
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

const OrderModal = ({ open, handleClose, activeRow, setRefresh }) => {
  const [status, setStatus] = useState();
  const [shippingCompany, setShippingCompany] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const [shippingError, setShippingError] = useState();
  const [trackingError, setTrackingError] = useState();
  const [disable, setDisable] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(
    activeRow?.orderedItems?.status
  );
  const [dropDowns, setDropDowns] = useState([]);
  useEffect(() => {
    const orderStatus1 = ["SHIPPED", "INTRANSIT", "DELIVERED"];
    const orderStatus2 = ["INTRANSIT", "DELIVERED"];
    const orderStatus3 = ["DELIVERED"];
    if (activeRow?.orderedItems?.status === "ORDERED") {
      setDropDowns(orderStatus);
    }
    if (activeRow?.orderedItems?.status === "INPROCESS") {
      setDropDowns(orderStatus1);
    }
    if (activeRow?.orderedItems?.status === "SHIPPED") {
      setDropDowns(orderStatus2);
    }
    if (activeRow?.orderedItems?.status === "INTRANSIT") {
      setDropDowns(orderStatus3);
    }
    setCurrentStatus(activeRow?.orderedItems?.status);
  console.log("activeRow?.orderedItems?.status",activeRow?.orderedItems?.status)
  }, [activeRow?.orderedItems?.status, currentStatus]);

  useEffect(() => {
    if (activeRow) {
      const shippingCompanyTemp = activeRow?.orderedItems?.shippingCompany;
      const trackingNumberTemp = activeRow?.orderedItems?.trackingNumber;
      setShippingCompany(shippingCompanyTemp);
      setTrackingNumber(trackingNumberTemp);
      if (shippingCompanyTemp && trackingNumberTemp) {
        setDisable(true);
      }
    }
  }, [activeRow]);

  const handleCatChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "shippingCompany") {
      setShippingCompany(e.target.value);
      setShippingError();
    }
    if (e.target.name === "trackingNumber") {
      setTrackingNumber(e.target.value);
      setTrackingError();
    }
  };

  const updateOrderDetails = async () => {
    try {
      if (!shippingError && !trackingError) {
        const payload = {
          status: status,
          orderObjectId: activeRow._id,
          itemId: activeRow.orderedItems._id,
          productId: activeRow.orderedItems.productId,
          shippingCompany: shippingCompany,
          trackingNumber: trackingNumber,
        };
        const res = await updateOrderInfo(token, payload);
        if (res.data.statusCode === 200) {
          alert(res.data.statusMessage);
          handleClose();
          setRefresh(true);
        }
      } else {
        return;
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleSubmit = () => {
    if (!shippingCompany) setShippingError("error");
    if (!trackingNumber) setTrackingError("error");
    if (status === "INPROCESS") updateOrderDetails();
    if (status !== "INPROCESS") {
      if (shippingCompany && trackingNumber) updateOrderDetails();
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
          <strong>Current Status: </strong> {currentStatus}
        </Typography>
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
          {dropDowns.map((item, id) => {
            return (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        {dropDowns.includes(status) && !status.includes("INPROCESS") && (
          <TextField
            disabled={disable}
            value={shippingCompany}
            error={shippingError ? true : false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="enter shipping company"
            name="shippingCompany"
            autoComplete="off"
            autoFocus
            onChange={onChangeHandler}
            helperText={
              shippingError ? "kindly enter shipping company details" : ""
            }
          />
        )}
        {dropDowns.includes(status) && !status.includes("INPROCESS") && (
          <TextField
            disabled={disable}
            value={trackingNumber}
            error={trackingError ? true : false}
            margin="normal"
            required
            fullWidth
            id="email"
            label="enter tracking number"
            name="trackingNumber"
            autoComplete="off"
            autoFocus
            onChange={onChangeHandler}
            helperText={trackingError ? "cant be empty" : ""}
          />
        )}
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", textAlign: "center" }}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Container>
      </Box>
    </Modal>
  );
};
export default OrderModal;
