import { useState, useEffect, Fragment } from "react"
import {getSellerOrderInfo} from "../../apis/orders/getSellerOrderInfo"
import Table from "../../components/Table"
import {Container} from "@mui/material";

const SellerOrders=()=>{
    const [orderedItems,setOrderedItems] = useState()
    let token = JSON.parse(localStorage.getItem("token"));
    const [refetch,setRefetch] = useState(false)
    const handleRefetch=()=>{
        setRefetch(!refetch)
    }
    useEffect(()=>{
        const fetchOrder =async()=>{
        const res = await getSellerOrderInfo(token)
        setOrderedItems(res.data.data)
        }
        fetchOrder()
    },[token])
    
    return(
        <Container
          maxWidth="lg"
          sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
        >
            <Table orderedItems={orderedItems} handleRefetch={handleRefetch}/>
        </Container>
    )
}
export default SellerOrders