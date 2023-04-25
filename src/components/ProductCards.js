import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color:"#878787"}}>
            {product.brand}
          </Typography>
          <Typography variant="body1" sx={{color:"#212121"}}>
            {product.title && product.title.substring(0, 40)}....
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: "18px",mt:1.5,color:"#212121",fontWeight:"500" }}
          >
            <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
            {product?.price}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
export default ProductCard;
