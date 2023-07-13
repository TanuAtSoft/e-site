import { Fragment, useState, useEffect } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../apis/carts/addToCart";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useMediaQuery } from "react-responsive";
import { addRatings } from "../apis/ratings/addRatings";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { cancelOrder } from "../apis/orders/cancelOrder";
import { getSingleProduct } from "../apis/products/getSingleProduct";
import { getUserInfo } from "../apis/admin/userInfo";

const BuyerOrderedCard = ({
  product,
  paymentMode,
  handleRefresh,
  orderObjectId,
  handleRefetch,
}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const navigate = useNavigate();
  const [notAvailable, setNotAvailable] = useState(false);

  useEffect(() => {
    const checkStock = async () => {
      const res = await getSingleProduct(product.productId);
      if (res?.data?.data?.product?.stock === 0) {
        setNotAvailable(true);
      }
    };
    const checkSellerState = async () => {
      const res = await getUserInfo(token, product.seller);
      if (res?.data?.data?.sellers?.softDelete) {
        setNotAvailable(true);
      }
    };
    if (product) {
      checkStock();
      checkSellerState();
    }
  }, [product, token]);

  const handleCancelOrder = async () => {
    const data = {
      orderObjectId: orderObjectId,
      productId: product.productId,
    };
    const res = await cancelOrder(token, data);
    if (res) {
      if (res.data.statusCode === 200) {
        alert(res.data.statusMessage);
      }
    }
  };

  const handleBuyAgain = async () => {
    const data = {
      productId: product.productId,
    };
    const res = await addToCart(token, JSON.stringify(data));
    if (res.data.statusCode === 200) {
      alert(res.data.statusMessage);
      handleRefresh();
      navigate("/cart");
    }
  };

  const handleRating = async (rate) => {
    const data = {
      orderObjectId: orderObjectId,
      itemId: product._id,
      productId: product.productId,
      rating: rate,
    };
    const res = await addRatings(token, JSON.stringify(data));
    if (res.data.statusCode === 200) {
      alert(res.data.statusMessage);
      handleRefetch();
      // navigate("/cart");
    }
  };
  function NewArray(size) {
    var x = [];
    for (var i = 0; i < size; ++i) {
      x[i] = i;
    }
    return x;
  }

  var filledArr = NewArray(product.rating);
  var unfilledArr = NewArray(5 - product.rating);

  return (
    <Fragment>
      <Grid
        container
        // spacing={1}
        component={Paper}
        sx={{ borderRadius: "0px 0px 5px 5px", alignItems: "center" }}
      >
        <Grid item xs={6} md={3} sx={{ textAlign: "center" }}>
          <img
            src={product.image}
            alt="product"
            style={{ maxWidth: "100%", maxHeight: "180px" }}
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <Typography variant="body" sx={{ fontWeight: "bolder" }}>
            {product.title.substring(0, 50)}
          </Typography>
          <br />
          <Typography variant="body">
            <strong>Paid:</strong>{" "}
            <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
            {product.discountedPrice
              ? product.discountedPrice * product.quantity
              : product.price * product.quantity}
          </Typography>
          <br />
          <Typography variant="body">
            <strong>Quantity: </strong>
            {product.quantity}
          </Typography>
          <br />
          {notAvailable ? (
            <Typography><strong>Out of Stock</strong></Typography>
          ) : (
            <Button variant="contained" onClick={() => handleBuyAgain()}>
              Buy again
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ paddingLeft: isTabletOrMobile ? "18%" : "" }}
        >
          <div className="product-price-div" style={{ gap: "0px" }}>
            <Typography variant="body">
              <strong>Status : </strong>
              {product.status} <strong>On </strong>{" "}
              {moment(product.updatedAt).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body">
              <strong>Payment Mode : </strong>
              {paymentMode}
            </Typography>
            {product.shippingDetails ? (
              <Typography variant="body">
                <strong>Shipping Detail : </strong>
                {product.shippingDetails}
              </Typography>
            ) : (
              ""
            )}
            {/* && product.rating === 0 */}
            {product.status === "DELIVERED" && product.rating === 0 && (
              <Fragment>
                <Typography>How was the product?</Typography>
                <div className="reviews">
                  <div
                    className="rating"
                    onClick={() => {
                      handleRating(1);
                    }}
                  >
                    <StarBorderIcon />
                    <p>Very Bad</p>
                  </div>
                  <div
                    className="rating"
                    onClick={() => {
                      handleRating(2);
                    }}
                  >
                    <StarBorderIcon />
                    <p>Bad</p>
                  </div>
                  <div
                    className="rating"
                    onClick={() => {
                      handleRating(3);
                    }}
                  >
                    <StarBorderIcon />
                    <p>Ok Ok</p>
                  </div>
                  <div
                    className="rating"
                    onClick={() => {
                      handleRating(4);
                    }}
                  >
                    <StarBorderIcon />
                    <p>Good</p>
                  </div>
                  <div
                    className="rating"
                    onClick={() => {
                      handleRating(5);
                    }}
                  >
                    <StarBorderIcon />
                    <p>Very Good</p>
                  </div>
                </div>
              </Fragment>
            )}
            {product.status === "DELIVERED" && product.rating > 0 && (
              <Fragment>
                <Typography>Your rating to this product</Typography>
                <div className="reviews">
                  {filledArr.map((item) => {
                    return (
                      <div className="rating" key={item}>
                        <StarIcon />
                        {/* <p>Very Bad</p> */}
                      </div>
                    );
                  })}
                  {unfilledArr.map((item) => {
                    return (
                      <div className="rating" key={item}>
                        <StarBorderIcon />
                      </div>
                    );
                  })}
                  {/* <p>Very Bad</p> */}
                </div>
              </Fragment>
            )}
            {(product.status === "ORDERED" ||
              product.status === "INPROCESS" ||
              product.status === "SHIPPED") && (
              <Button variant="outlined" onClick={handleCancelOrder}>
                Cancel
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default BuyerOrderedCard;
