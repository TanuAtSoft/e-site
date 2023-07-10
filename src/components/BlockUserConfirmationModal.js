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
  import {blockSeller} from "../apis/admin/blockSeller"

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
  
  const BlockUserConfirmationModal = ({ activeRow,open, handleClose}) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const handleDelete =async()=>{
     const res = await blockSeller(token,activeRow._id)
     console.log("res",res)
    //  if(res.data.statusCode === 200){
    //   alert(res.data.statusMessage)
    //   handleRefresh()
      handleClose()
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
            {activeRow?.softDelete? "Do you want to Unblock the seller":"Do you want to block the User ?"}
          </Typography>
          <Container
            maxWidth="lg"
            sx={{ padding: "0px",paddingTop:"20px", textAlign: "center",justifyContent:"space-between" }}
          >
            <div className="delete-confirmation-modal-btnDiv">
            <Button variant ="contained" 
            onClick={() => handleDelete()}
            >Yes</Button>
            <Button variant ="contained" onClick={() => handleClose()}>Cancel</Button>
            </div>
          </Container>
        </Box>
      </Modal>
    );
  };
  export default BlockUserConfirmationModal;
  