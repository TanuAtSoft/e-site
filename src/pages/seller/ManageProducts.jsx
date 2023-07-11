import { useState, useEffect, Fragment } from "react";
import { Container, Grid, Typography } from "@mui/material";
import ManageProductCard from "../../components/ManageProductCard";
import { getProductsByUser } from "../../apis/products/getProductByUser";
import Loader from "../../components/Loader";

const ManageProducts = () => {
  const [products, setProducts] = useState();
  let token = JSON.parse(localStorage.getItem("token"));
  const [refresh,setRefresh] = useState(false)
  const handleRefresh =()=>{
    setRefresh(!refresh)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProductsByUser(token);
      if (res.data.statusCode === 200) {
        setProducts(res.data.data);
      }
    };
    fetchProducts();
  }, [token,refresh]);
  return (
    <Container
      maxWidth="md"
      sx={{ padding: "20px 0px", minHeight: "calc(100vh - 160px)" }}
    >
      {products ? (
        <Fragment>
          <Grid
            container
            spacing={2}
            sx={{ padding: "50px 10px", paddingTop: "0px" }}
          >
            <Grid item xs={4} md={3}></Grid>
            <Grid item xs={4} md={6}>
              <Typography variant="h4">Manage your Products</Typography>
            </Grid>
            <Grid item xs={4} md={3}></Grid>
          </Grid>{" "}
          {products.length >0 && products.map((item,id)=>{
            return(
            <Fragment  key ={id}>
            <ManageProductCard product={item} handleRefresh={handleRefresh}/>
            <br/>
            </Fragment>
            )
          })}
        </Fragment>
      ) : (
        <Loader />
      )}
    </Container>
  );
};
export default ManageProducts;
