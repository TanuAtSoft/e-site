import React, { useState, Fragment } from "react";

import ProductCard from "../../components/ProductCards";
import { Grid, Container } from "@mui/material";
import { useEffect, Suspense } from "react";
import { getProducts } from "../../apis/products/getProducts";
import Loader from "../../components/Loader";
import { useMediaQuery } from "react-responsive";
import { getTopRatedProducts } from "../../apis/products/getTopRatedProducts";
import { useLocation } from "react-router-dom";
import { getBestSeller } from "../../apis/orders/bestSellerProducts";
import { useSearchParams } from "react-router-dom";
import { getSearchedProducts } from "../../apis/products/getSearchedProducts";

const LandingPage = ({ handleRefresh }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      if (location.pathname === "/" && (!params || params === "")) {
        const res = await getProducts();
        //console.log("res", res.data.data.products);
        setProducts(res?.data?.data?.products);
        setLoading(false);
      }
      if (location.pathname === "/topRated") {
        const res = await getTopRatedProducts();
        setProducts(res.data.data);
        setLoading(false);
      }
      if (location.pathname === "/bestSeller") {
        const res = await getBestSeller();
        //console.log("res", res.data.data.products);
        setProducts(res.data.data);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.pathname, params]);

  useEffect(() => {
    const fetchSearch = async () => {
      const res = await getSearchedProducts(params);
      if (res.data.statusCode === 200) {
        setProducts(res.data.data);
        setLoading(false);
      }
    };
    if (location.pathname === "/" && params) {
      fetchSearch();
    }
  }, [location.pathname, params]);

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
        <Grid
          container
          direction={"row"} 
          spacing={6}
          // style={{ marginLeft: isTabletOrMobile ? "0px" : "" }}
        >
          {products &&
            products.map((item, id) => {
              return (
                <Fragment key={id}>
                  {item?.seller?.softDelete ? (
                    <Fragment></Fragment>
                  ) : (
                    <Grid item xs={12} md={3} className="card-grid">
                      <ProductCard
                        product={item}
                        handleRefresh={handleRefresh}
                        fromWishlist={false}
                      />
                    </Grid>
                  )}
                </Fragment>
              );
            })}
        </Grid>
      </Container>
    </Suspense>
  );
};
export default LandingPage;
