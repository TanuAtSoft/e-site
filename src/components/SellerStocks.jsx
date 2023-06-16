import { useState, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { getSellerStockMetrics } from "../apis/seller_metrics/seller_stock_details";
import Item from "./Item";
import Loader from "./Loader";
import { getProductsByUser } from "../apis/products/getProductByUser";

const SellerStock = () => {
  const [stock, setStock] = useState();
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

  useEffect(() => {
    const fetchStock = async () => {
      const res = await getSellerStockMetrics(token);
      if (res.data.statusCode === 200) {
        setStock(res.data.data);
      }
    };
    fetchStock();
  }, [token]);

  const findItemSold = (id) => {
    if (stock && stock.length > 0) {
      for (let i = 0; i < stock.length; i++) {
        if (stock[i]._id === id) {
          return stock[i].total_items_sold;
        }
      }
    }
  };

  return (
    <Fragment>
      {stock ? (
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={2}
          direction="column"
          //direction={!isTabletOrMobile ? "column" : "row"}
        >
          <Grid item xs={12} md={1} style={{ borderRadius: "5px" }}>
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
                    <Typography>Items Available</Typography>
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
                            {findItemSold(item._id)
                              ? findItemSold(item._id)
                              : 0}
                          </Typography>
                        </td>
                        <td>
                          <Typography>{item.stock}</Typography>
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
  );
};
export default SellerStock;
