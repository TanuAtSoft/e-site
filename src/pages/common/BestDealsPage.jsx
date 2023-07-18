import { useEffect, useState,Suspense} from "react"
import {getBestDealProducts} from "../../apis/products/getBestDealsProduct"
import ProductCard from "../../components/ProductCards";
import { Grid, Container } from "@mui/material";
import Loader from "../../components/Loader";
import { useMediaQuery } from "react-responsive";

const BestDealsProduct =()=>{
    const [products,setProducts] = useState()
    const [loading, setLoading] = useState(true);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  
    useEffect(()=>{
      const fecthBestDealsProduct =async()=>{
        const res = await getBestDealProducts()
        if(res.data.statusCode === 200){
            setProducts(res.data.data)
            setLoading(false)
        }
      }
      fecthBestDealsProduct()
    },[])

    return(
        <Suspense fallback={<Loader />}>
        {loading && <Loader />}
        <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
          <Grid
            container
            direction={"row"}
            spacing={6}
            //style={{ marginLeft: isTabletOrMobile ? "0px" : "" }}
          >
            {products &&
              products.map((item, id) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    key={id}
                    // style={{ paddingLeft: "19px" }}
                    className="card-grid"
                  >
                    <ProductCard
                      product={item}
                      isBestDeals = {true}
                      fromWishlist={false}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Suspense>
    )
}
export default BestDealsProduct;