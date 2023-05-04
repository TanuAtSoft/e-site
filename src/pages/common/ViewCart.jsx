import { Fragment, useEffect, useState } from "react";
import { getCartDetails } from "../../apis/carts/getCartDetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../apis/carts/addToCart";
import axios from "axios"
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

const ViewCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState();
  const [refresh, setRefresh] = useState(false);
  const [address, setAddress] = useState();
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [total,setTotal] = useState()

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
    }
  };

  const handleDecreaseQuantity = async (id) => {
    const data = {
      productId: id,
    };
    const res = await removeItemFromCart(token, JSON.stringify(data));
    if (res) {
      setRefresh(!refresh);
    }
  };

  const handleDelete = async (id) => {
    const data = {
      productId: id,
    };
    const res = await deleteItemFromCart(token, JSON.stringify(data));
    if (res) {
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const fetchCartDetails = async () => {
      const res = await getCartDetails(token);
      if (res.data.statusCode === 200) {
        if (res.data.data.length > 0) {
          setCartItems(res.data.data);
        } else {
          setCartItems();
        }
      } else {
        setCartItems();
      }
    };
    fetchCartDetails();
  }, [token, refresh]);

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
  }, [token, refresh]);

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cart", cartItems.length);
      let total =0;
      const calcTotal=()=>{
        for(let i=0; i< cartItems.length; i++){
          const itemTotal = parseFloat(cartItems[i].price) * parseFloat(cartItems[i].quantity)
         total = total + itemTotal
        }
        return total
      }
     const subTotal= calcTotal()
     setTotal(subTotal)      
    }
   
    
  }, [cartItems]);


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
					const verifyUrl = "http://localhost:8080/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
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
		try {
			const orderUrl = "http://localhost:8080/orders";
			const { data } = await axios.post(orderUrl, { amount: total });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)" }}
    >
      <Grid container direction={"row"} spacing={1}>
        <ViewAddressModal
          openView={openView}
          handleViewClose={handleViewClose}
          handleViewOpen={handleViewOpen}
          address={address}  
        />
        <AddAddressModal
         openAdd={openAdd}
         handleAddClose={handleAddClose}
         
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
                <Typography onClick={handleViewOpen}>Select address</Typography>
              )}
              {!address && (
                <Typography onClick={handleAddOpen}>Add address</Typography>
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
                    <Grid item xs={12} md={4.5} sx={{ maxHeight: "400px" }}>
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
                    <Grid
                      item
                      xs={12}
                      md={3.5}
                      sx={{ maxHeight: "400px", maxWidth: "fit-content" }}
                    >
                      <Typography>{item.brand}</Typography>
                      <Typography>
                        <CurrencyRupeeIcon style={{ fontSize: "14px" }} />{" "}
                        {item.price}
                      </Typography>
                      <Typography>Free Delivery</Typography>
                      <br />
                      <div className="quantity">
                        <div
                          className="icons"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                        >
                          <AddIcon />
                        </div>
                        <button>{item.quantity}</button>
                        <div
                          className="icons"
                          onClick={() => handleDecreaseQuantity(item.productId)}
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
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ maxHeight: "400px" }}>
                      <Typography>Free Delivery</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            {(!cartItems || cartItems.length === 0) && (
              <Typography>No Items available in the cart</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} sx={{minHeight: "calc(100vh - 160px)" }}>
          <Card sx={{ minWidth: 275}}>
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
              {cartItems && <Typography variant="body1">
                Total Items: {cartItems.length}
               
              </Typography>}
              {cartItems && <Fragment>
                <br />
                {cartItems.map((item,id)=>{
                  return(
                    <div key={id} className="sub-total-div">
                    <>{item.title.substring(0,20)}</>
                    <>{item.price} x {item.quantity}</>
                    </div>
                  )
                })}
                </Fragment>
              }
              <br/>
              <div className="sub-total-div" >
              <Typography style={{ fontWeight: "bolder"}}>
              Total Amount
              </Typography>
              <Typography style={{ fontWeight: "bolder"}}>
              <CurrencyRupeeIcon style={{fontSize: "14px"}}/>{total}
              </Typography>
              </div>
              
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
              >
                Pay
              </Button>
             
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ViewCart;
