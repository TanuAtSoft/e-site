import { useSearchParams } from 'react-router-dom';
import { useEffect, useState,Suspense} from 'react';
import {getProductsByCategory} from "../../apis/products/getCategoryByProduct"
import ProductCard from "../../components/ProductCards";
import { Grid, Container, Typography } from "@mui/material";
import Loader from "../../components/Loader"
import { useMediaQuery } from 'react-responsive';

const CategoryPage=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const myParam = searchParams.get('category');
    const [products,setProducts] = useState()
    const [loading,setLoading] = useState(true)
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useEffect(()=>{
        const fetchProducts = async()=>{
            const res = await getProductsByCategory(myParam)
            if(res.data.statusCode === 200){
                setProducts(res.data.data)
                setLoading(false)
            }
        }
        fetchProducts()
    },[myParam])

    return(
        <Suspense fallback={<Loader />}>
        {loading && <Loader />}
        <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
          <Grid container direction={"row"} spacing={6} style={{marginLeft:isTabletOrMobile?"0px":""}}>
            {products &&
              products.map((item, id) => {
                return (
                  <Grid item xs={12} md={3} key={id} style={{ paddingLeft: "19px"}}>
                    <ProductCard product={item} fromWishlist={false}/>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
        <Container style={{ textAlign:"center"}}>
        {products && products.length === 0 && <Grid item xs={12} md={3}  style={{ textAlign:"center", minHeight:"85vh"}}>
                  <Typography variant='h6'> No Products found with such category</Typography>
                  </Grid>}
                  </Container>
      </Suspense>
    )
}
export default CategoryPage;