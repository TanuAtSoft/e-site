import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Paper, Grid, Container, Typography } from "@mui/material";
import BasicCard from "../components/BasicCard";

const ProductDetails = () => {
  const [product, setProducts] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setProducts(location.state.product);
    }
    if (!location.state) {
    }
  }, [location.state]);
  function Item(props) {
    return (
      <Paper sx={{ height: "auto" }}>
        <img
          src={props.item}
          alt=""
          style={{ width: "100%", height: "auto", maxHeight:"100vh" }}
        />
      </Paper>
    );
  }

  console.log("id", location.state);
  return (
    <Container maxWidth="xl" sx={{ padding: "20px 0px" }}>
      <Grid container direction={"row"} spacing={1}>
        <Grid item xs={12} md={6} sx={{maxHeight:"100vh"}}>
          <Carousel>
            {product &&
              product.images.map((item, i) => <Item key={i} item={item} />)}
          </Carousel>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.5}
          sx={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}
        >
          <Container className="decsription-div" sx={{ width: "100%",maxHeight:"100vh" }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: "18px" }}
            >
              {product?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "18px" }}
            >
              Price: <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
              {product?.price}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "16px" }}
            >
              About this Item:
            </Typography>
            {product?.description.map((item, id) => {
              return (
                <Typography
                  key={id}
                  gutterBottom
                  variant="h6"
                  component="p"
                  sx={{ fontSize: "14px" }}
                >
                  {item}
                </Typography>
              );
            })}
          </Container>
        </Grid>
        <Grid item xs={12} md={2.5} sx={{maxHeight:"99vh"}}>
          <BasicCard />
        </Grid>
      </Grid>
    </Container>
  );
};
export default ProductDetails;
