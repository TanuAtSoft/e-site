import { useEffect, useState } from "react";
import { getCartDetails } from "../../apis/carts/getCartDetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../../apis/carts/addToCart";
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

const ViewCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState();
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    const fetchCartDetails = async () => {
      const res = await getCartDetails(token);
      if (res.data.statusCode === 200) {
        if (res.data.data.length > 0) {
          setCartItems(res.data.data);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCartDetails();
  }, [token, refresh]);

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)" }}
    >
      <Grid container direction={"row"} spacing={1}>
        <Grid item xs={12} md={8}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ p: "20px" }}>Deliver to</Paper>
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
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ maxHeight: "400px" }}>
                      <Typography>Free Delivery</Typography>
                    </Grid>
                  </Grid>
                );
              })}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} sx={{ maxHeight: "100vh" }}>
          <Card sx={{ minWidth: 275, height: "80vh" }}>
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
                In stock
              </Typography>

              <Typography variant="body2">
                sold by
                <br />
              </Typography>
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
                // onClick={handleAddCart}
              >
                Add to Cart
              </Button>
              <Button variant="contained" sx={{ width: "100% !important" }}>
                Buy now
              </Button>
              <Button variant="outlined" sx={{ width: "100% !important" }}>
                Add to wishlist
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ViewCart;
