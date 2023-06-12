import { useState, useEffect, Fragment } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { getSellerDashboardMetrics } from "../../apis/seller_metrics/dashboard_metrics";
import Item from "../../components/Item";
import SellerHome from "../../components/SellerHome";
import SellerRevenueComponent from "../../components/SellerRevenueComponent";
import SellerStock from "../../components/SellerStocks"

const SellerDashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [dashboardMetrics, setDashboardMetrics] = useState();
  const [activeTab, setActiveTab] = useState("home");

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} style={{ borderRadius: "5px" }}>
          <Item>
            <Grid
              container
              spacing={2}
              direction="column"
              style={{ height: "85vh" }}
            >
              <Grid item>
                <PersonIcon style={{ fontSize: "100px" }} />
                <Typography gutterBottom variant="h6" component="div">
                  {user}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Welcome to your Dashboard
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={
                    activeTab === "home"
                      ? "mini-side-bar"
                      : "mini-side-bar-inactive"
                  }
                  onClick={() => handleActiveTab("home")}
                >
                  Home
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={
                    activeTab === "revenue"
                      ? "mini-side-bar"
                      : "mini-side-bar-inactive"
                  }
                  onClick={() => handleActiveTab("revenue")}
                >
                  Revenue
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={
                    activeTab === "stocks"
                      ? "mini-side-bar"
                      : "mini-side-bar-inactive"
                  }
                  onClick={() => handleActiveTab("stocks")}
                >
                  stocks
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={
                    activeTab === "payment"
                      ? "mini-side-bar"
                      : "mini-side-bar-inactive"
                  }
                  onClick={() => handleActiveTab("payment")}
                >
                  Payments
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={
                    activeTab === "bestSold"
                      ? "mini-side-bar"
                      : "mini-side-bar-inactive"
                  }
                  onClick={() => handleActiveTab("bestSold")}
                >
                  Best Sold
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        {activeTab === "home" && (
          <SellerHome  />
        )}
         {activeTab === "revenue" && (
          <SellerRevenueComponent  />
        )}
        {activeTab === "stocks" && (
          <SellerStock />
        )}
        
      </Grid>
    </Container>
  );
};
export default SellerDashboard;
