import { useState,useEffect,Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import {getSellerRevenueMetrics} from "../apis/seller_metrics/seller_revenue_deatils"
import Loader from "./Loader";
import Item from "./Item";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


const SellerRevenueComponent =()=>{
  const [revenue,setRevenue] = useState()
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(()=>{
    const fetchRevenue =async()=>{
   const res = await getSellerRevenueMetrics(token)
   if (res.data.statusCode === 200) {
    setRevenue(res.data.data);
  }
    }
    fetchRevenue()

  },[token])



    return(
      <Fragment>
      {revenue ? (
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          direction="column"
          //direction={!isTabletOrMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={2} style={{ borderRadius: "5px" }}>
            <Item
              style={{
                lineHeight: "0.2",
                padding: "15px",
              }}
            >
              <Typography> Revenue Generated</Typography>
            </Item>
          </Grid>

          <Grid item xs={12} md={2} style={{ borderRadius: "5px" }}>
            <Item
              style={{
                lineHeight: "0.2",
                padding: "15px",
              }}
            >
              <table id="customers">
                <tr>
                  <th>
                    <Typography>Id</Typography>
                  </th>
                  <th>
                    <Typography>Product</Typography>
                  </th>
                  <th>
                    <Typography>Items Delivered</Typography>
                  </th>
                  <th>
                    <Typography>Revenue Generated (<CurrencyRupeeIcon style={{fontSize:"16px"}}/>)</Typography>
                  </th>
                </tr>
                {revenue.length > 0 &&
                  revenue.map((item, id) => {
                    return (
                      <tr key={id}>
                        <td>
                          <Typography>{item._id}</Typography>
                        </td>
                        <td>
                          <img
                            src={item.image}
                            alt="img"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </td>
                        <td>
                          <Typography>
                           {item.total_items_sold }
                          </Typography>
                        </td>
                        <td>
                          <Typography>{item.revenue_generated}</Typography>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Grid xs={12} md={9} style={{ borderRadius: "5px" }}>
          <Loader />
        </Grid>
      )}
    </Fragment>
    )
}
export default SellerRevenueComponent