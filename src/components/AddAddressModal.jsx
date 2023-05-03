import { useState } from "react";
import { Container, Modal, Box, TextField, Button } from "@mui/material";
import {addAddress} from "../apis/address/addAddressApi"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "500px",
  overflowY: "scroll",
};

const AddAddressModal = ({ openAdd, handleAddClose }) => {
  const initialAddress = {
    fullName: "",
    mobileNumber: "",
    pincode: "",
    houseNumber: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  };
  const [address, setAddress] = useState(initialAddress);
  const token = JSON.parse(localStorage.getItem("token"));

  const sumbitAddress = async() => {
    console.log("address", address);
    const res = await addAddress(token,JSON.stringify(address));
    console.log("rees",res)
    if(res.data.statusCode === 200){
        alert(res.data.statusMessage)
        handleAddClose()
    }
  };
  const onChangeHandler = (e) => {
    console.log("e", e.target.name)
    const name = e.target.name;
    const value = e.target.value;
    address[name] = value;
    setAddress({...address})
  };

  return (
    <Container>
      <Modal
        open={openAdd}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={() => {
              console.log("submit");
            }}
          >
            <TextField
              value={address.fullName}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="fullName"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />

            <TextField
              value={address.mobileNumber}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile"
              name="mobileNumber"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.pincode}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="pinCode"
              label="pinCode"
              name="pincode"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.houseNumber}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="houseNo"
              label="Flat, House no., Building, Company, Apartment"
              name="houseNumber"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.area}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="area"
              label="Area, Street, Sector, Village"
              name="area"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.landmark}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="landmark"
              label="Landmark"
              name="landmark"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.city}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="city"
              label="Town/City"
              name="city"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <TextField
              value={address.state}
              //error={errorFields.includes("email") ? true : false}
              margin="normal"
              required
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="off"
              autoFocus
              onChange={onChangeHandler}
              //   helperText={
              //     errorFields.includes("email") ? "Incorrect entry." : ""
              //   }
            />
            <br />

            <Button
              variant="contained"
              sx={{ width: "100% !important" }}
              onClick={sumbitAddress}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};
export default AddAddressModal;
