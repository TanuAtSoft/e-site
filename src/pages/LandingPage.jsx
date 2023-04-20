import { useState } from "react";
import ProductCard from "../components/ProductCards";
import { Grid, Container } from "@mui/material";
import { useEffect, Suspense } from "react";
import { getProducts } from "../apis/products/getProducts";
import AppLoader from "../components/AppLoader";

const LandingPage = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      console.log("res", res.data.data.products);
      setProducts(res?.data?.data?.products);
    };
    fetchProducts();
  }, []);

  return (
    <Suspense fallback={<AppLoader />}>
      <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
        <Grid container direction={"row"} spacing={6}>
          {products &&
            products.map((item, id) => {
              return (
                <Grid item xs={12} md={3} key={id}>
                  <ProductCard product={item}/>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Suspense>
  );
};
export default LandingPage;
