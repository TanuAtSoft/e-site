import { Fragment, useEffect, useState } from "react";
import { getSingleProduct } from "../apis/products/getSingleProduct";

const BestSoldProductCard = ({ productId }) => {
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getSingleProduct(productId);
      setProduct(res.data.data.product);
    };
    if (productId) {
      fetchProducts();
    }
  }, [productId]);

return(
    <Fragment>
    {product &&
<img src={product.images[0]} alt="product" stle={{height: "100px",width:"100px"}}/>
    }
    </Fragment>
)
};

export default BestSoldProductCard;
