import { useState, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import Loader from "./Loader";
import { getSellerBestSoldMetrics } from "../apis/seller_metrics/seller_best_sold_info";
import BestSoldProductCard from "./BestSoldProductCard";

const SellerBestSoldComponent = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [bestsoldProducts, setBestSoldProducts] = useState();

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      const res = await getSellerBestSoldMetrics(token);
      console.log("res.data.data[0].top_selling_products", res.data.data);
      if (res.data.statusCode === 200) {
        setBestSoldProducts(res.data.data);
      }
    };
    if (token) {
      fetchDashboardMetrics();
    }
  }, [token]);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Fragment>
      {bestsoldProducts ? (
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          // direction="column"
          direction={!isTabletOrMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={2} style={{ borderRadius: "5px" }}>
            <Item
              style={{
                lineHeight: "0.2",
                padding: "15px",
              }}
            >
              <Typography> Your top three best sold products</Typography>
            </Item>
          </Grid>

          <Grid item xs={12} md={10}>
            <Item
              style={{
                lineHeight: "0.2",
                padding: "15px",
              }}
            >
              <div className="best-sold-cards-container" style={{flexDirection: !isTabletOrMobile ? "row" : "column"}}>
                {bestsoldProducts.length > 0 &&
                  bestsoldProducts.map((item, id) => {
                    return (
                      <BestSoldProductCard key ={id} product={item}/>
                    );
                  })}
              </div>
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Grid xs={12} md={9} style={{ borderRadius: "5px" }}>
          <Loader />
        </Grid>
      )}
    </Fragment>
  );
};
export default SellerBestSoldComponent;
