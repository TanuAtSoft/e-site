import {
  Modal,
  Box,
  Typography,
  // Select,
  // MenuItem,
  Container,
  Button,
  // TextField,
} from "@mui/material";
import { deleteSingleProductById } from "../apis/products/deleteProductById";

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

const DeleteConfirmationModal = ({ productId,open, handleClose,handleRefresh }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const handleDelete =async()=>{
   const res = await deleteSingleProductById(token,productId)
   if(res.data.statusCode === 200){
    alert(res.data.statusMessage)
    handleRefresh()
    handleClose()
   }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you want to delete the product
        </Typography>
        <Container
          maxWidth="lg"
          sx={{ padding: "0px",paddingTop:"20px", textAlign: "center",justifyContent:"space-between" }}
        >
          <div className="delete-confirmation-modal-btnDiv">
          <Button variant ="contained" onClick={() => handleDelete()}>Yes</Button>
          <Button variant ="contained" onClick={() => handleClose()}>Cancel</Button>
          </div>
        </Container>
      </Box>
    </Modal>
  );
};
export default DeleteConfirmationModal;
