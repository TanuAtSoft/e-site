import { useState,useEffect,Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import {getSellerRevenueMetrics} from "../apis/seller_metrics/seller_revenue_deatils"
import Loader from "./Loader";
import Item from "./Item";
import { getProductsByUser } from "../apis/products/getProductByUser";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";


const SellerRevenueComponent =()=>{
  const [revenue,setRevenue] = useState()
  const token = JSON.parse(localStorage.getItem("token"));
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsByUser(token);
      if (res.data.statusCode === 200) {
        setProducts(res.data.data);
      }
    };
    fetchProducts();
  }, [token]);

  useEffect(()=>{
    const fetchRevenue =async()=>{
   const res = await getSellerRevenueMetrics(token)
   if (res.data.statusCode === 200) {
    setRevenue(res.data.data);
  }
    }
    fetchRevenue()

  },[token])

  const findItemSold=(id)=>{
    if(revenue && revenue.length >0){
      for(let i =0 ; i< revenue.length; i++){
        if(revenue[i]._id === id){
          return {
            itemsold:revenue[i].total_items_sold,
            total_revenue: revenue[i].revenue_generated
          }
        }
      }
    }
  }

  if(revenue){
    console.log(findItemSold("6486f2a32f1afbba67bf631d"))
  }

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
              <Typography> Stocks</Typography>
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
                    <Typography>Items Sold</Typography>
                  </th>
                  <th>
                    <Typography>Revenue Generated (<CurrencyRupeeIcon style={{fontSize:"16px"}}/>)</Typography>
                  </th>
                </tr>
                {products && products.length > 0 &&
                  products.map((item, id) => {
                    return (
                      <tr key={id}>
                        <td>
                          <Typography>{item._id}</Typography>
                        </td>
                        <td>
                          <img
                            src={item.images[0]}
                            alt="img"
                            style={{ height: "50px", width: "50px" }}
                          />
                        </td>
                        <td>
                          <Typography>
                           {findItemSold(item._id) === undefined ?  0 : findItemSold(item._id)?.itemsold }
                          </Typography>
                        </td>
                        <td>
                          <Typography>{findItemSold(item._id) === undefined ? 0:  findItemSold(item._id)?.total_revenue }</Typography>
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