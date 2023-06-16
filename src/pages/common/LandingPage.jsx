import React, {useState }  from 'react';

import ProductCard from "../../components/ProductCards";
import { Grid, Container } from "@mui/material";
import { useEffect, Suspense } from "react";
import { getProducts } from "../../apis/products/getProducts";
import Loader from '../../components/Loader';
import { useMediaQuery } from 'react-responsive';
import {getTopRatedProducts} from "../../apis/products/getTopRatedProducts"
import { useLocation } from "react-router-dom";
import {getBestSeller} from "../../apis/orders/bestSellerProducts"

const LandingPage = ({handleRefresh}) => {
  const [products, setProducts] = useState();
  const [loading,setLoading] = useState(true)
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
 const location = useLocation()
 console.log("params",location)

  useEffect(() => {
    const fetchProducts = async () => {
      if(location.pathname === "/"){
      const res = await getProducts();
      //console.log("res", res.data.data.products);
      setProducts(res?.data?.data?.products);
      setLoading(false)
      }
      if(location.pathname === "/topRated"){
        const res = await getTopRatedProducts();
        setProducts(res.data.data);
        setLoading(false)
        }
        if(location.pathname === "/bestSeller"){
          const res = await getBestSeller();
          //console.log("res", res.data.data.products);
          setProducts(res.data.data);;
          setLoading(false)
          }
    };
    fetchProducts();
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
        <Grid container direction={"row"} spacing={6} style={{marginLeft:isTabletOrMobile?"0px":""}}>
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
