import { useState,useEffect } from "react"
import {getAllOrders} from "../../apis/orders/getAllOrders"
import {Container} from "@mui/material";
import AdminOrderMgmntTable from "../../components/AdminOrderMgmntTable"

const OrdersManagement =()=>{
    const [orders,setOrders] = useState()
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(()=>{
        const fetchOrders = async()=>{
            const res = await getAllOrders(token)
            if(res.data.statusCode === 200){
                setOrders(res.data.data)
            }
            
        }
        if(token){
            fetchOrders()
        }

    },[token])
    return(
        <Container
        maxWidth="lg"
        sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
      >
          <AdminOrderMgmntTable orders={orders} />
      </Container>
    )
}
export default OrdersManagement