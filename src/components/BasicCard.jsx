import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../apis/carts/addToCart";
import { addToWishlist } from "../apis/wishlist/addToWishlist";

const BasicCard = ({ product }) => {
  const cartCount = JSON.parse(localStorage.getItem("cart"));
  const [count, setCount] = React.useState(cartCount);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleAddCart = async () => {
    const data = {
      productId: product._id,
    };
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await addToCart(token, JSON.stringify(data));
    if (res.data.statusCode === 200) {
      let temp = count;
      temp = temp + 1;
      setCount(temp);
      localStorage.setItem("cart", temp);
      alert(res.data.statusMessage);
    }
  };
  const handleAddToWishlist = async () => {
    const data = {
      productId: product._id,
    };
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await addToWishlist(token, JSON.stringify(data));
    if (res.data.statusCode === 200) {
      alert(res.data.statusMessage);
    }
  };
  return (
    <Card sx={{ minWidth: 275, height: "80vh" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <CheckCircleIcon style={{ fontSize: 17 }} /> One time Purchase
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
          <LocationOnIcon /> select delivery location
        </Typography>
        <Typography variant="h5" sx={{ mt: 1.5 }}>
          In stock
        </Typography>

        <Typography variant="body2">
          sold by
          <br />
          {product.seller.name}
        </Typography>
        {/* <Typography sx={{ mb: 1.5,mt: 1.5 }} component="div">
          Quantity:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={count}
            label="count"
            onChange={handleChange}
            sx={{height:"23px"}}
          >
            {Quantity.map((item,id)=>{
              return(
                <MenuItem value={item}  key={id}>{item}</MenuItem>
              )
            })}
          </Select>
        </Typography> */}
      </CardContent>
      <CardActions
        sx={{ flexDirection: "column", justifyContent: "center", gap: "30px" }}
      >
        <Button
          variant="contained"
          sx={{ width: "100% !important" }}
          onClick={handleAddCart}
        >
          Add to Cart
        </Button>
        {/* <Button variant="contained" sx={{width:"100% !important"}}>
         Buy now
        </Button> */}
        <Button
          variant="outlined"
          sx={{ width: "100% !important" }}
          onClick={handleAddToWishlist}
        >
          Add to wishlist
        </Button>
      </CardActions>
    </Card>
  );
};
export default BasicCard;
