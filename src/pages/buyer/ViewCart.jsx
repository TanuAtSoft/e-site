import { Fragment, useEffect, useState } from "react";
import { getCartDetails } from "../../apis/carts/getCartDetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../apis/carts/addToCart";
import Loader from "../../components/Loader";
import { generateRandomString } from "../../helpers/generateRandomString";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { removeItemFromCart } from "../../apis/carts/removeItemFromCart";
import { deleteItemFromCart } from "../../apis/carts/deleteItemFromCart";
import { getAddress } from "../../apis/address/getAddressApi";
import ViewAddressModal from "../../components/ViewAdressModal";
import AddAddressModal from "../../components/AddAddressModal";
import { createPayment } from "../../apis/payment/createPayment";
import { verifyPayment } from "../../apis/payment/verifyPayment";
import { saveOrder } from "../../apis/orders/saveOrder";
import OderConfirmationModal from "../../components/OderConfirmationModal";
import { getSingleProduct } from "../../apis/products/getSingleProduct";

const ViewCart = ({ handleRefresh, handleCartCount }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState();
  const [refresh, setRefresh] = useState(false);
  const [address, setAddress] = useState();
  const [openView, setOpenView] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [total, setTotal] = useState();
  const [refetch, setRefetch] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [changedCartItems, setChangedCartItems] = useState([]);
  const [totalSaving, setTotalSaving] = useState();

  const handleAddressSelect = (address) => {
    const completeAddress =
      address.fullName +
      " " +
      address.mobileNumber +
      " " +
      address.houseNumber +
      " " +
      address.area +
      " " +
      address.landmark +
      " " +
      address.city +
      " " +
      address.state +
      " " +
      address.pincode;
    setSelectedAddress(completeAddress);
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleViewOpen = () => {
    setOpenView(true);
  };
  const handleViewClose = () => {
    setOpenView(false);
  };

  const handleIncreaseQuantity = async (id) => {
    const data = {
      productId: id,
    };
    const res = await addToCart(token, JSON.stringify(data));
    if (res) {
      setRefresh(!refresh);
      handleRefresh();
    }
  };

  const handleDecreaseQuantity = async (id) => {
    const data = {
      productId: id,
    };
    const res = await removeItemFromCart(token, JSON.stringify(data));
    if (res) {
      handleRefresh();
      setRefresh(!refresh);
      handleRefresh();
    }
  };

  const handleDelete = async (id) => {
    const data = {
      productId: id,
    };
    const res = await deleteItemFromCart(token, JSON.stringify(data));
    if (res) {
      setRefresh(!refresh);
      handleRefresh();
    }
  };

  useEffect(() => {
    const fetchCartDetails = async () => {
      const res = await getCartDetails(token);
      if (res.data.statusCode === 200) {
        if (res.data.data.length > 0) {
          setCartItems(res.data.data);
        } else {
          setCartItems([]);
          setInitialLoading(false)
        }
      } else {
        setCartItems();
        setInitialLoading(false)
      }
    };
    fetchCartDetails();
  }, [token, refresh]);

  useEffect(() => {
    const fetchProducts = async (id) => {
      const res = await getSingleProduct(id);
      const product = await res.data?.data?.product;
     const sellerDeleted = res.data?.data?.product?.seller?.softDelete;
      const temp = (product.price / 100) * product.discount;
      const temp2 = product.price - temp;
      const data =  {
        discountedPrice:temp2.toFixed(),
        sellerDeleted:  sellerDeleted
      }
      return data

    };
    const calcDiscounts = async () => {
      let total = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const data = await fetchProducts(cartItems[i].productId);
       cartItems[i].sellerDeleted = data.sellerDeleted
        cartItems[i].discountedPrice = parseInt(data.discountedPrice);
        const itemTotal =
          parseInt(data.discountedPrice) * parseInt(cartItems[i].quantity);
          if(!data.sellerDeleted){
            total = total + itemTotal;
          }
       
        setChangedCartItems([...changedCartItems, cartItems[i]]);
      }
      setTotalSaving(total);
    };
    if (cartItems && cartItems.length > 0) {
      calcDiscounts();
      setInitialLoading(false);
    }
  }, [cartItems]);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      const res = await getAddress(token);
      if (res.data.statusCode === 200) {
        if (res.data.data.length > 0) {
          setAddress(res.data.data);
        } else {
          setAddress();
        }
      } else {
        setAddress();
      }
    };
    fetchAddressDetails();
  }, [token, refetch]);

  useEffect(() => {
    if (cartItems) {
      let total = 0;
      const calcTotal = () => {
        for (let i = 0; i < cartItems.length; i++) {
          const itemTotal =
            parseInt(cartItems[i].price) * parseInt(cartItems[i].quantity);
          total = total + itemTotal;
        }
        return total;
      };
      const subTotal = calcTotal();
      setTotal(subTotal);
    }
  }, [cartItems]);

  useEffect(() => {
    if (!initialLoading) {
      let total = 0;
      const calcTotal = () => {
        for (let i = 0; i < cartItems.length; i++) {
          const itemTotal =
            parseInt(cartItems[i].discountedPrice) *
            parseInt(cartItems[i].quantity);
          total = total + itemTotal;
        }
        return total;
      };
      const subTotal = calcTotal();
      setTotalSaving(subTotal);
    }
  }, [cartItems, initialLoading]);

  // console.log("total", total);
  // console.log("totalSaving", totalSaving);

  const handleAddAddress = () => {
    setOpenView(false);
    setOpenAdd(true);
  };

  const initPayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      //name: book.name,
      description: "Test Transaction",
      //image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          setLoading(true);
          setOpen(true);
          const res = await verifyPayment(token, response);
          const status = await res.data.statusCode;
          if (status === 200) {
            try {
              const payload = {
                orderId: res.data.data.orderId,
                deliveryAddress: selectedAddress,
                isCod: false,
                totalAmountPaid: totalSaving
              };
              const orderRes = await saveOrder(token, JSON.stringify(payload));
              if (orderRes.remote === "success") {
                alert(orderRes.data.statusMessage);
                setRefresh(!refresh);
                handleCartCount(0);
                setLoading(false);
                handleRefresh();
                setOpen(false);
              }
            } catch (e) {
              setLoading(false);
              console.log("oredr save e", e);
              setOpen(false);
            }
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    if (selectedAddress) {
      try {
        const { data } = await createPayment(token, { amount: totalSaving });
        initPayment(data.data);
      } catch (e) {
        console.log("e", e);
      }
    } else {
      if (address) {
        setOpenView(true);
      } else {
        setOpenAdd(true);
      }
    }
  };

  const handleCashOnDelivery = async () => {
    if (selectedAddress) {
      setLoading(true);
      setOpen(true)
      try {
        const orderId = "order_" + generateRandomString(14);
        const payload = {
          orderId: orderId,
          deliveryAddress: selectedAddress,
          isCod: true,
          totalAmountPaid: totalSaving
        };
       const orderRes = await saveOrder(token, JSON.stringify(payload));
        if (orderRes?.remote === "success") {
          alert(orderRes.data.statusMessage);
          setRefresh(!refresh);
          handleCartCount(0);
          setLoading(false);
          handleRefresh();
          setOpen(false)
        }
      } catch (e) {
        console.log("e", e);
        setOpen(false)
      }
    } else {
      if (address) {
        setOpenView(true);
      } else {
        setOpenAdd(true);
      }
    }
  };
  return (
    <Fragment>
      {!initialLoading ? (
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)" }}
        >
          {cartItems && cartItems.length > 0 && (
            <Grid container direction={"row"} spacing={1}>
              <ViewAddressModal
                openView={openView}
                handleViewClose={handleViewClose}
                handleViewOpen={handleViewOpen}
                address={address}
                handleAddAddress={handleAddAddress}
                handleAddressSelect={handleAddressSelect}
              />
              <AddAddressModal
                openAdd={openAdd}
                handleAddClose={handleAddClose}
                setRefetch={setRefetch}
                refetch={refetch}
                handleAddressSelect={handleAddressSelect}
              />
              <Grid item xs={12} md={8}>
                <Grid item xs={12} md={12}>
                  <Paper
                    sx={{
                      p: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>Deliver to</Typography>
                    {address && (
                      <Typography onClick={handleViewOpen}>
                        Select address
                      </Typography>
                    )}
                    {!address && (
                      <Typography onClick={handleAddOpen}>
                        Add address
                      </Typography>
                    )}
                  </Paper>
                </Grid>
                <br />

                <Paper sx={{ p: 10 }}>
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((item, id) => {
                      return (
                        <Grid key={id} container direction={"row"} spacing={1}>
                          <Grid
                            item
                            xs={12}
                            md={4.5}
                            sx={{ maxHeight: "400px" }}
                          >
                            <img
                              src={item.image}
                              alt={`cart${id}`}
                              style={{
                                height: "180px",
                                width: "180px",
                                border: "0.5px solid grey",
                              }}
                            />
                          </Grid>
                          {item.sellerDeleted ? <Grid
                            item
                            xs={12}
                            md={3.5}
                            sx={{ maxHeight: "400px", maxWidth: "fit-content" }}
                          >
                            <Typography>Item not available</Typography>
                          </Grid>:<Grid
                            item
                            xs={12}
                            md={3.5}
                            sx={{ maxHeight: "400px", maxWidth: "fit-content" }}
                          >
                            <Typography>{item.brand}</Typography>
                            <Typography>
                              {item.price !== item.discountedPrice && (
                                <s>{item.price}</s>
                              )}
                              <CurrencyRupeeIcon style={{ fontSize: "14px" }} />{" "}
                              {item.discountedPrice}
                            </Typography>
                            <Typography>Free Delivery</Typography>
                            <br />
                            <div className="quantity">
                              <div
                                className="icons"
                                onClick={() =>
                                  handleIncreaseQuantity(item.productId)
                                }
                              >
                                <AddIcon />
                              </div>
                              <button>{item.quantity}</button>
                              <div
                                className="icons"
                                onClick={() =>
                                  handleDecreaseQuantity(item.productId)
                                }
                              >
                                <RemoveIcon />
                              </div>
                            </div>
                            <br />
                            <Typography
                              style={{ fontSize: "14px", color: "red" }}
                              onClick={() => handleDelete(item.productId)}
                            >
                              Remove
                            </Typography>
                          </Grid>}
                          
                          <Grid item xs={12} md={4} sx={{ maxHeight: "400px" }}>
                            <Typography>Free Delivery</Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  {cartItems.length === 0 && (
                    <Typography>No Items available in the cart</Typography>
                  )}
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{ minHeight: "calc(100vh - 160px)" }}
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    ></Typography>
                    <Typography
                      sx={{ mb: 1.5, mt: 1.5 }}
                      color="text.secondary"
                    ></Typography>
                    <Typography variant="h5" sx={{ mt: 1.5 }}>
                      Total Amount to be paid
                    </Typography>
                    <br />
                    {cartItems && (
                      <Typography variant="body1">
                        Total Items: {cartItems.length}
                      </Typography>
                    )}
                    {cartItems && (
                      <Fragment>
                        <br />
                        {cartItems.map((item, id) => {
                          return (
                            <div key={id} className="sub-total-div">
                              <>{item.title.substring(0, 20)}</>
                              <>
                                {item.price} x {item.quantity}
                              </>
                            </div>
                          );
                        })}
                      </Fragment>
                    )}
                    <br />
                    {!isNaN(totalSaving) && (
                      <div className="sub-total-div">
                        <Typography style={{ fontWeight: "bolder" }}>
                          Total Amount
                        </Typography>
                        <Typography style={{ fontWeight: "bolder" }}>
                          <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                          {totalSaving}
                        </Typography>
                      </div>
                    )}
                    {total - totalSaving !== 0 &&
                      !isNaN(total - totalSaving) && (
                        <div className="sub-total-div">
                          <Typography style={{ fontWeight: "bolder" }}>
                            Total Savings
                          </Typography>
                          <Typography style={{ fontWeight: "bolder" }}>
                            <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                            {total - totalSaving === total ? 0: total - totalSaving}
                          </Typography>
                        </div>
                      )}
                  </CardContent>
                  <CardActions
                    sx={{
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "100% !important" }}
                      onClick={handlePayment}
                      disabled={totalSaving ===0 ? true: false}
                    >
                      Pay
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: "100% !important" }}
                      onClick={handleCashOnDelivery}
                      disabled={totalSaving ===0 ? true: false}
                    >
                      Cash On Delivery
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
          {!cartItems && (
            <Container maxWidth="lg">
              <Loader />
            </Container>
          )}
          {loading && setInitialLoading && (
            <Container maxWidth="lg">
              <Loader />
            </Container>
          )}
          {cartItems && cartItems.length === 0 && (
            <Container maxWidth="lg">No Items available in the cart</Container>
          )}
          <Container maxWidth="lg">
            <OderConfirmationModal open={open} />
          </Container>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <Loader />
        </Container>
      )}
    </Fragment>
  );
};
export default ViewCart;
