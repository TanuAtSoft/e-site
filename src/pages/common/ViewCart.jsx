import { useEffect } from "react";
import { getCartDetails } from "../../apis/carts/getCartDetails";

const ViewCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
   useEffect(() => {
    const fetchCartDetails = async () => {
      const res = await getCartDetails(token);
      console.log("res", res);
    };
    fetchCartDetails();
  }, [token]);
  return <h1>This is cart Page</h1>;
};
export default ViewCart;
