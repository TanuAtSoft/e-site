import { useState,useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getSellerStockMetrics } from "../apis/seller_metrics/seller_stock_details";

const SellerStock =()=>{
    const [stock, setStock] = useState();
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
    const fetchStock=async()=>{
        const res = await getSellerStockMetrics(token)
        console.log("res",res.data.data)
    }
    fetchStock()
    },[token])

    return(
        <Grid
        item
        container
        xs={12}
        md={9}
        spacing={2}
        direction="column"
        //direction={!isTabletOrMobile ? "column" : "row"}
      >
        <Typography> comp</Typography>
        </Grid>
    )
}
export default SellerStock