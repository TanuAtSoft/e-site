import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <Link
        to={`details/${product._id}` }
        state={{ product:product }}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="250"
          image={product.images[0]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.brand}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.title && product.title.substring(0, 40)}....
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-around" }}>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Link>
    </Card>
  );
};
export default ProductCard;
