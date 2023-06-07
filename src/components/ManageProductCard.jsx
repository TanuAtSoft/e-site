import { useState, Fragment } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import EditProductModal from "./EditProductModal";

const ManageProductCard = ({ product, handleRefresh }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditModal = () => {
    setOpenEdit(false);
  };
  console.log("product", product)

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      {!product.softDeleted && (
        <Grid
          container
          spacing={1}
          component={Paper}
          sx={{ padding: "10px", paddingLeft: "0px" }}
        >
          <Grid item xs={4} md={3} sx={{ textAlign: "center" }}>
            <img
              src={product?.images[0]}
              alt="product"
              style={{ maxWidth: "100%", maxHeight: "180px" }}
            />
          </Grid>
          <Grid item xs={4} md={7}>
            <Typography variant="body" sx={{ fontWeight: "bolder" }}>
              {product.title}
            </Typography>
            <br />
            <Typography variant="body">
              <strong>Brand :</strong> {product.brand}
            </Typography>
            <br />
            <Typography variant="body">
              <strong>Details :</strong>{" "}
              {product.description[0].substring(0, 150)}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <div className="product-price-div">
              <Typography variant="body">
                <strong>Price:</strong>{" "}
                <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                {product.price}
              </Typography>
              <Typography variant="body">Product Price</Typography>

              <Button
                variant="contained"
                sx={{ width: "100% !important" }}
                onClick={() => setOpenEdit(true)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{ width: "100% !important" }}
                onClick={() => setOpen(true)}
              >
                Delete
              </Button>
              <DeleteConfirmationModal
                open={open}
                handleClose={handleClose}
                productId={product._id}
                handleRefresh={handleRefresh}
              />
              <EditProductModal openEdit={openEdit} handleEdit={handleEditModal} productDetails={product}/>
            </div>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};
export default ManageProductCard;
