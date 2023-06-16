import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addToCart } from "../apis/carts/addToCart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";

const ProductCard = ({ product, handleRefresh, fromWishlist }) => {
  const [visibile, setVisible] = useState("hidden");
  const token = JSON.parse(localStorage.getItem("token"));
  const [rating, setRating] = useState();
  let filledArr, unfilledArr;
  const navigate = useNavigate();
  const showButton = (e) => {
    e.preventDefault();
    setVisible("visible");
  };
  useEffect(() => {
    if (product.reviews && product.reviews.length > 0) {
      const tempArr = product.reviews;
      const sum = tempArr.reduce((a, b) => a + b, 0);
      const avg = sum / tempArr.length || 0;
      setRating(avg);
    }
  }, [product]);

  function NewArray(size) {
    var x = [];
    for (var i = 0; i < size; ++i) {
      x[i] = i;
    }
    return x;
  }

  filledArr = NewArray(rating);
  unfilledArr = NewArray(5 - rating);

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
          image={product.image ? product.image :product.images[0]}
          style={{objectFit:"contain"}}
        />
      </Link>
      <CardContent>
        <div className="brand-review-div">
          <Typography gutterBottom variant="h5" sx={{ color: "#878787" }}>
            {product.brand.substring(0, 10)}
          </Typography>
          <div className="reviews" style={{ gap: "0px" }}>
            {filledArr &&
              filledArr.map((item) => {
                return (
                  <div className="rating" key={item}>
                    <StarIcon style={{ fontSize: "14px" }} />
                    {/* <p>Very Bad</p> */}
                  </div>
                );
              })}
            {unfilledArr &&
              unfilledArr.map((item) => {
                return (
                  <div className="rating" key={item}>
                    <StarBorderIcon style={{ fontSize: "14px" }} />
                  </div>
                );
              })}
            {/* <p>Very Bad</p> */}
          </div>
        </div>

        <Typography variant="body1" sx={{ color: "#212121" }}>
          {product.title && product.title.substring(0, 24)}....
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            mt: 1.5,
            color: "#212121",
            fontWeight: "500",
          }}
        >
          <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
          {product.price}
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
