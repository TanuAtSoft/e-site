import { useEffect, useState,Suspense } from "react";
import { getWishlist } from "../../apis/wishlist/getWishlist";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { Grid, Container } from "@mui/material";
import ProductCard from "../../components/ProductCards";

const Wishlist = ({handleRefresh}) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getWishlist(token);
      if (res.data.statusCode === 200) {
        if (res.data.data.length > 0) {
          setWishlistItems(res.data.data);
        } else {
          setWishlistItems([]);
        }
      } else {
        setWishlistItems();
      }
    };

    if (!token) {
      navigate("/login");
    }
    if (token) {
      fetchWishlist();
    }
  }, [token]);
  console.log("wishlistItems", wishlistItems);

  return (
    <Suspense fallback={<Loader />}>
      {!wishlistItems && <Loader />}
      <Container maxWidth="lg" sx={{ padding: "20px 0px" }}>
        <Grid container direction={"row"} spacing={6}>
          {wishlistItems &&
            wishlistItems.map((item, id) => {
              return (
                <Grid item xs={12} md={3} key={id} style={{ paddingLeft: "19px"}}>
                  <ProductCard product={item} handleRefresh={handleRefresh} fromWishlist={true}/>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Suspense>
  );
};
export default Wishlist;
