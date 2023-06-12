import { useState,useEffect } from "react";
import { Grid, Typography } from "@mui/material";

const SellerRevenueComponent =()=>{
    return(
        <Grid
        item
        container
        xs={12}
        md={9}
        spacing={2}
        //direction={!isTabletOrMobile ? "column" : "row"}
      >
        <Typography>Revenue comp</Typography>
        </Grid>
    )
}
export default SellerRevenueComponent