import { useState, useEffect, Fragment } from "react";
import { getBuyerOrderInfo } from "../../apis/orders/getBuyerOrderInfo";
import { Container, Grid, Typography } from "@mui/material";
import moment from "moment/moment";
import BuyerOrderedCard from "../../components/BuyerOrderedCard";
import Loader from "../../components/Loader";

const Orders = ({ handleRefresh }) => {
  const [orders, setOrders] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const [refetch, setRefetch] = useState(false);
  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getBuyerOrderInfo(token);
        if (res) {
          if (res.data.statusCode === 200) {
            setOrders(res.data.data);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrders();
  }, [token,refetch]);

  return (
    <Container
      maxWidth="md"
      sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)" }}
    >
      {orders ? (
        <Fragment>
          <Grid
            container
            spacing={2}
            sx={{ padding: "50px 10px", paddingTop: "0px" }}
          >
            <Grid item xs={4} md={3}></Grid>
            <Grid item xs={4} md={6}>
              <Typography variant="h4">Ordered</Typography>
            </Grid>
            <Grid item xs={4} md={3}></Grid>
          </Grid>{" "}
          {orders.length > 0 &&
            orders.map((item, id) => {
              return (
                <div className="buyer-order-div-container" key={id}>
                  <div className="buyer-order-details">
                    <div className="buyer-order-details-inner-div">
                      <div className="most-inner-div">
                        <Typography>Ordered On</Typography>
                        <Typography>
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </div>
                      <div className="most-inner-div">
                        <Typography>Shipping Address</Typography>
                        <Typography>
                          {item.deliveryAddress.substring(0, 50)}
                        </Typography>
                      </div>
                    </div>
                    <div className="buyer-order-details-inner-div">
                      <div
                        className="most-inner-div"
                        style={{ wordBreak: "break-all" }}
                      >
                        <Typography>Order#</Typography>
                        <Typography>{item.orderId}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="buyer-order-div">
                    {item.orderedItems.map((inneritem, id) => {
                      return (
                        <BuyerOrderedCard
                          key={id}
                          product={inneritem}
                          paymentMode={item.paymentStatus}
                          handleRefresh={handleRefresh}
                          orderObjectId={item._id}
                          handleRefetch={handleRefetch}
                        />
                      );
                    })}
                  </div>
                  <br />
                </div>
              );
            })}
        </Fragment>
      ) : (
        <Loader />
      )}
    </Container>
  );
};
export default Orders;
