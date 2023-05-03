import { useState } from "react";
import { Container, Modal, Box, Typography } from "@mui/material";

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
};

const ViewAddressModal = ({ openView, handleViewClose, address }) => {
  const [selected, setSelected] = useState();

  const handleSelect = (e) => {
    setSelected(e.target.name);

  };

  return (
    <Container>
      <Modal
        open={openView}
        onClose={handleViewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={() => {
              console.log("submit");
            }}
          >
            {address &&
              address.map((item, id) => {
                return (
                  <Typography key={id}>
                    <input
                      type="radio"
                      value={id}
                      name={id}
                      onChange={handleSelect}
                      checked={id === selected? true:false}
                    />
                    {item.fullName +
                      " " +
                      item.houseNumber +
                      " " +
                      item.area +
                      " " +
                      item.landmark +
                      " " +
                      item.city +
                      " " +
                      item.state +
                      " " +
                      item.pincode}
                  </Typography>
                );
              })}
          </form>
        </Box>
      </Modal>
    </Container>
  );
};
export default ViewAddressModal;
