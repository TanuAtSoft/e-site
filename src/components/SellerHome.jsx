import { useState, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { getSellerDashboardMetrics } from "../apis/seller_metrics/dashboard_metrics";
import Loader from "./Loader";

const SellerHome = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [dashboardMetrics, setDashboardMetrics] = useState();

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      const res = await getSellerDashboardMetrics(token);
      if (res.data.statusCode === 200) {
        setDashboardMetrics(res.data.data);
      }
    };
    if (token) {
      fetchDashboardMetrics();
    }
  }, [token]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <Fragment>
      {dashboardMetrics ? (
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          direction={!isTabletOrMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={6} style={{ borderRadius: "5px" }}>
            <Item
              style={{
                textAlign: !isTabletOrMobile ? "left" : "center",
                lineHeight: "0.2",
                padding: "15px",
              }}
            >
              <Typography gutterBottom variant="h6">
                Order Activity
              </Typography>
              <Typography
                gutterBottom
                variant="body"
                style={{ fontSize: "12px" }}
              >
                Activities that you need to monitor to maintain your orders
              </Typography>
              <div
                className="seller-dashboard-orders-div"
                style={{
                  flexDirection: isTabletOrMobile ? "column" : "row",
                  alignItems: isTabletOrMobile ? "center" : "left",
                  justifyContent: "space-around",
                }}
              >
                <div className="seller-dashboard-orders-inner-div">
                  <AddShoppingCartOutlinedIcon style={{ fontSize: "50px" }} />
                  <div className="seller-dashboard-orders-number-div">
                    <p>Ordered</p>
                    {dashboardMetrics && <h3>{dashboardMetrics.ordered}</h3>}
                  </div>
                </div>
                <div className="seller-dashboard-orders-inner-div">
                  <ListAltIcon style={{ fontSize: "50px" }} />
                  <div className="seller-dashboard-orders-number-div">
                    <p>Processed</p>
                    {dashboardMetrics && <h3>{dashboardMetrics.processed}</h3>}
                  </div>
                </div>
                <div className="seller-dashboard-orders-inner-div">
                  <Inventory2OutlinedIcon style={{ fontSize: "50px" }} />
                  <div className="seller-dashboard-orders-number-div">
                    <p>Shipped</p>
                    {dashboardMetrics && <h3>{dashboardMetrics.shipped}</h3>}
                  </div>
                </div>
                <div className="seller-dashboard-orders-inner-div">
                  <LocalShippingOutlinedIcon style={{ fontSize: "50px" }} />
                  <div className="seller-dashboard-orders-number-div">
                    <p>Transit</p>
                    {dashboardMetrics && <h3>{dashboardMetrics.transit}</h3>}
                  </div>
                </div>
                <div className="seller-dashboard-orders-inner-div">
                  <TokenOutlinedIcon style={{ fontSize: "50px" }} />
                  <div className="seller-dashboard-orders-number-div">
                    <p>Delivered</p>

                    <h3>{dashboardMetrics.delivered}</h3>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} style={{ padding: "25px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: isTabletOrMobile ? "column" : "row",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <Card
                variant="outlined"
                style={{ borderRadius: "5px", width: "300px" }}
              >
                {" "}
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Revenue
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    generated
                  </Typography>
                  <div className="revenue-div">
                    <CurrencyRupeeIcon
                      style={{
                        fontSize: "50px",
                        flexDirection: "row",
                        verticalAlign: "middle",
                        justifyContent: "center",
                      }}
                    />
                    {dashboardMetrics && (
                      <Typography variant="body">
                        {dashboardMetrics.totalRevenue}
                        <br />
                      </Typography>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card
                variant="outlined"
                style={{ borderRadius: "10px", width: "300px" }}
              >
                {" "}
                <CardContent>
                  <Typography variant="h5" component="div">
                    Total Items
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    sold
                  </Typography>
                  <div className="revenue-div">
                    <ShoppingBagOutlinedIcon style={{ fontSize: "50px" }} />
                    {dashboardMetrics && (
                      <Typography variant="body">
                        {dashboardMetrics.totalitemsSold}
                        <br />
                      </Typography>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} md={9}>
          <Loader />
        </Grid>
      )}
    </Fragment>
  );
};
export default SellerHome;
