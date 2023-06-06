import React, {useState }  from 'react';

import ProductCard from "../../components/ProductCards";
import { Grid, Container } from "@mui/material";
import { useEffect, Suspense } from "react";
import { getProducts } from "../../apis/products/getProducts";
import Loader from '../../components/Loader';

const LandingPage = ({handleRefresh}) => {
  const [products, setProducts] = useState();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      //console.log("res", res.data.data.products);
      setProducts(res?.data?.data?.products);
      setLoading(false)
    };
    fetchProducts();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
        <Grid container direction={"row"} spacing={6}>
          {products &&
            products.map((item, id) => {
              return (
                <Grid item xs={12} md={3} key={id} style={{ paddingLeft: "19px"}}>
                  <ProductCard product={item} handleRefresh={handleRefresh} fromWishlist={false}/>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Suspense>
  );
};
export default LandingPage;
