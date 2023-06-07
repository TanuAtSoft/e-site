import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addToCart } from "../apis/carts/addToCart";

const ProductCard = ({ product, handleRefresh, fromWishlist }) => {
  const [visibile, setVisible] = useState("hidden");
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const showButton = (e) => {
    e.preventDefault();
    setVisible("visible");
  };

  const hideButton = (e) => {
    e.preventDefault();
    setVisible("hidden");
  };
  const handleAddCart = async (id) => {
    const data = {
      productId: id,
    };
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await addToCart(token, JSON.stringify(data));
    if (res.data.statusCode === 200) {
      handleRefresh();
      alert(res.data.statusMessage);
    }
  };
  const handleViewDetails = (id) => {
    navigate(`details/${id}`);
  };
  return (
    <Card
      sx={{ maxWidth: 350, position: "relative", zIndex: "1" }}
      onMouseEnter={(e) => showButton(e)}
      onMouseLeave={(e) => hideButton(e)}
    >
      <Link
        to={`details/${product._id}`}
        state={{ product: product }}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="250"
          image={product.images[0]}
        />
      </Link>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#878787" }}
        >
          {product.brand}
        </Typography>
        <Typography variant="body1" sx={{ color: "#212121" }}>
          {product.title && product.title.substring(0, 24)}....
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "18px",
            mt: 1.5,
            color: "#212121",
            fontWeight: "500",
          }}
        >
          <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
          {product?.price}
        </Typography>
        {!fromWishlist && (
          <div
            className="cards-hidden-div"
            style={{ visibility: `${visibile}` }}
          >
            <Button
              variant="contained"
              onClick={() => handleAddCart(product._id)}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              onClick={() => handleViewDetails(product._id)}
            >
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default ProductCard;
