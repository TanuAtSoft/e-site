import { useState } from "react";
import { Container, Modal, Box, Typography } from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewAddressModal = ({ openView, handleViewClose, address,handleAddAddress , handleAddressSelect}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (e,address) => {
    setSelected(e.target.value);
    
    handleAddressSelect(address)
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
                      onChange={(e) => { handleSelect(e,item) }}
                      checked={selected.includes(id)}
                      style={{marginRight:"20px"}}
                    />
                    {`Name:${item.fullName}` +
                      " " +
                     `Phone:${item.mobileNumber}` + " " + `House/plot/flat no ${item.houseNumber}`}
                    <br />
                    {
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
          <br/>

        <div className="add-location" onClick={handleAddAddress}>
         <AddLocationAltIcon style={{fontSize:"16px"}}/>Add Location
         </div>
        </Box>
       
      </Modal>
    </Container>
  );
};
export default ViewAddressModal;
