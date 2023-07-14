import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Item from "../../components/Item";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import SellerHome from "../../components/SellerHome";
import SellerRevenueComponent from "../../components/SellerRevenueComponent";
import SellerStock from "../../components/SellerStocks";
import SellerBestSoldComponent from "../../components/SellerBestSoldComponent";
import ConstructionIcon from "@mui/icons-material/Construction";

const SellerDashboard = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  const [cookies] = useCookies(["verified"]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("home");
  const navigate= useNavigate()

  useEffect(()=>{
    if(cookies.verified === "false"){
      if(cookies.submittedVerDoc === "false"){
       navigate(`/submitSellerVerificationDetails/${token}`)
      }
      if(cookies.submittedVerDoc === "true"){
       navigate("/verificationPending")
      }
    }
  },[cookies.submittedVerDoc, cookies.verified, navigate, token])

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

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
        {activeTab === "home" && <SellerHome />}
        {activeTab === "revenue" && <SellerRevenueComponent />}
        {activeTab === "stocks" && <SellerStock />}
        {activeTab === "bestSold" && <SellerBestSoldComponent />}
        {activeTab === "payment" && (
          <Grid
            item
            xs={12}
            md={9}
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ConstructionIcon />
            <Typography>Under Construction</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default SellerDashboard;
