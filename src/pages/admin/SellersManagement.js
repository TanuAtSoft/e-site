import {  useEffect, useState } from "react";
import { getSellers } from "../../apis/admin/getSelllers";
import { Container } from "@mui/material";
import UserSellerTable from "../../components/UserSellerTable";

const SellersManagement = () => {
  const [sellers, setSellers] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const [refetch, setRefetch] = useState(false);
  const handleRefetch = () => {
    setRefetch(!refetch);
  };
  
  useEffect(() => {
    const fetchSellers = async () => {
      const res = await getSellers(token);
      // console.log("res", res.errors.errors)
      if (res.remote === "success") {
        if (res.data.statusCode === 200) setSellers(res.data.data.sellers);
      }
      if (res.remote === "failure") {
        alert(res.errors.errors);
      }
    };
    fetchSellers();
  }, [token]);

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
    >
      <UserSellerTable sellers={sellers} handleRefetch={handleRefetch} />
    </Container>
  );
};
export default SellersManagement;
