import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const BestSoldProductCard = ({ product }) => {
  return (
    <Card
      sx={{ maxWidth: 350, position: "relative", zIndex: "1" }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={product.image}
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "#212121" }}>
          {product.title && product.title.substring(0, 24)}....
        </Typography>
        <div className="cards-hidden-div best-seller-div">
          <Typography><strong>Sold: </strong>{product.totalSold}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BestSoldProductCard;
