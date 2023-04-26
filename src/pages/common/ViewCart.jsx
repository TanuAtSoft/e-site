import { useEffect, useState } from "react";
import { getCartDetails } from "../../apis/carts/getCartDetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Paper,
  CardMedia,
} from "@mui/material";

const ViewCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState();
  useEffect(() => {
    const fetchCartDetails = async () => {
      const res = await getCartDetails(token);
      if (res.data.statusCode === 200) {
        setCartItems(res.data.data);
      } else {
        setCartItems([]);
      }
    };
    fetchCartDetails();
  }, [token]);
  console.log("cartItems", cartItems);
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)"}}
    >
      <Grid container direction={"row"} spacing={1} >
   
        <Grid item xs={12} md={8}>
        <Grid item xs={12} md={12} component="Paper">
         <Paper sx={{ p: "20px" }}>
          Deliver to 
           </Paper>
         </Grid>
         <br/>
        
          <Paper sx={{ p: 10 }}>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, id) => {
                return (
                  <Grid container direction={"row"} spacing={1}>
                    <Grid item xs={12} md={4.5} sx={{ maxHeight: "400px" }}>
                      <img
                        src={item.images[0]}
                        alt={`cart${id}`}
                        style={{
                          height: "200px",
                          width: "200px",
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
