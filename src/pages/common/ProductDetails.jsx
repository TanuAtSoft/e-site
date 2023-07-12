import React, { Fragment, useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Paper, Grid, Container, Typography } from "@mui/material";
import BasicCard from "../../components/BasicCard";
import { getSingleProduct } from "../../apis/products/getSingleProduct";
import Loader from "../../components/Loader";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const ProductDetails = ({
  handleRefresh,
  fromWishlist,
  handleWsihlistCount,
}) => {
  const [product, setProduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [discountedPrice, setDiscopuntedPrice] = useState();

  useEffect(() => {
    if (product && product.discount > 0) {
      const temp = (product.price / 100) * product.discount;
      const temp2 = product.price - temp;
      setDiscopuntedPrice(temp2.toFixed());
    }
  }, [product]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getSingleProduct(params.id);
      setProduct(res?.data?.data?.product);
      setLoading(false);
    };
    fetchProducts();
  }, [params.id]);


  function Item(props) {
    return (
      <Paper sx={{ height: "auto" }}>
        <img
          src={props.item}
          alt=""
          style={{ width: "100%", height: "auto", maxHeight: "100vh" }}
        />
      </Paper>
    );
  }

  const [rating, setRating] = useState();
  let filledArr, unfilledArr;

  useEffect(() => {
    if (product) {
      if (product.reviews.length > 0) {
        const tempArr = product.reviews;
        const sum = tempArr.reduce((a, b) => a + b, 0);
        const avg = sum / tempArr.length || 0;
        setRating(avg);
      }
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

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl" sx={{ padding: "20px 0px" }}>
          <Grid container direction={"row"} spacing={1}>
            <Grid item xs={12} md={6} sx={{ maxHeight: "100vh" }}>
              <Carousel>
                {product &&
                  product.images.map((item, i) => <Item key={i} item={item} />)}
              </Carousel>
            </Grid>
            <Grid
              item
              xs={12}
              md={3.5}
              sx={{
                paddingLeft: "0px !important",
                paddingRight: "0px !important",
              }}
            >
              <Container
                className="decsription-div"
                //sx={{ width: "100%", maxHeight: "100vh",overflow:"scroll" }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "18px" }}
                >
                  {product.title}
                </Typography>
                <div className="rating-details-page-div">
                  <div className="reviews" style={{ gap: "0px" }}>
                    {filledArr &&
                      filledArr.map((item) => {
                        return (
                          <div className="rating" key={item}>
                            <StarIcon />
                            {/* <p>Very Bad</p> */}
                          </div>
                        );
                      })}
                    {unfilledArr &&
                      unfilledArr.map((item) => {
                        return (
                          <div className="rating" key={item}>
                            <StarBorderIcon />
                          </div>
                        );
                      })}
                    {/* <p>Very Bad</p> */}
                  </div>
                  {product && rating && <p>({product.reviews.length})</p>}
                </div>
                {!rating && <Typography>No Rating available</Typography>}
                {product.discount === 0 && (
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    Price: <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                    {product.price}
                  </Typography>
                )}
                {product.discount > 0 && !product.seller.softDelete &&  (
                  <Fragment>
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      -{product.discount}% discount applied
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Price: <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                      {discountedPrice}
                    </Typography>
                  </Fragment>
                )}
                {product.seller?.softDelete &&  (
                  <Fragment>
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                     Item is not available
                    </Typography>
                  </Fragment>
                )}
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
                      sx={{ fontSize: "14px" }}
                    >
                      {item}
                    </Typography>
                  );
                })}
              </Container>
            </Grid>
            <Grid
              item
              xs={12}
              md={2.5}
              sx={{ maxHeight: "99vh" }}
              component="div"
            >
              <BasicCard
                product={product}
                handleRefresh={handleRefresh}
                fromWishlist={fromWishlist}
                handleWsihlistCount={handleWsihlistCount}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};
export default ProductDetails;
