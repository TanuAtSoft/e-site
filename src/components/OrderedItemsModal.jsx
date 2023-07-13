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
import { getUserInfo } from "../apis/admin/userInfo";
import { useState, useEffect } from "react";
import moment from "moment";

const style = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  width: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "95vh",
  overflowY: "scroll",
};

const OrderedItemsModal = ({ open, activeRow, handleClose }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getSellerName = async (id) => {
      const res = await getUserInfo(token, id);
      if (res?.data?.statusCode === 200) {
        const name = await res.data.data.sellers.name;
        setSellers((oldArr) => [...oldArr, name]);
      } else return "";
    };
    if (activeRow?.orderedItems?.length > 0) {
      for (let i = 0; i < activeRow.orderedItems.length; i++) {
        getSellerName(activeRow.orderedItems[i].seller);
      }
    }
  }, [activeRow, token]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want to verify the user
          </Typography>
        }
        <Container
          maxWidth="lg"
          sx={{
            padding: "0px",
            paddingTop: "20px",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          {activeRow?.orderedItems?.length > 0 && (
            <Container>
              <Typography>Ordered Items</Typography>
              {activeRow?.orderedItems?.map((item, id) => {
                return (
                  <Container key={id}>
                    <img
                      style={{ height: "auto", width: "40%" }}
                      src={item.image}
                      alt={item.title}
                    />
                    <Typography>
                      <strong>Quatity:</strong>
                      {item.quantity}
                    </Typography>
                    <Typography>
                      <strong>Actual Price:</strong>
                      {item.price}
                    </Typography>
                    {activeRow.paymentStatus === "PREPAID" && (
                      <Typography>
                        <strong>Amount Paid:</strong>
                        {item.discountedPrice
                          ? item.discountedPrice
                          : item.price}
                      </Typography>
                    )}
                    {activeRow.paymentStatus === "COD" && (
                      <Typography>
                        <strong>Amount To Be Collected:</strong>
                        {item.discountedPrice
                          ? item.discountedPrice
                          : item.price}
                      </Typography>
                    )}
                    <Typography>
                      <strong>Amount To Be Collected:</strong>
                      {sellers[id]}
                    </Typography>
                    <Typography>
                      <strong>Order Status:</strong>
                      {item.status} as on{" "}
                      {moment(item.updatedAt).format("DD/MM/YYYY")}
                    </Typography>
                    {item.shippingCompany && (
                      <Typography>
                        <strong>Shipment Details:</strong>
                        {item.shippingCompany} with tracking number{" "}
                        {item.trackingNumber}
                      </Typography>
                    )}

                    <br />
                  </Container>
                );
              })}
            </Container>
          )}
          {/* <div className="delete-confirmation-modal-btnDiv"> */}
          <Button variant="contained" onClick={() => handleClose()}>
            Close
          </Button>
          {/* </div> */}
        </Container>
      </Box>
    </Modal>
  );
};
export default OrderedItemsModal;
