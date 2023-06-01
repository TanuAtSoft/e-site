import { useState,useEffect, Fragment } from "react";
import {Container} from "@mui/material";
import {getBuyerOrderInfo} from "../../apis/orders/getBuyerOrderInfo"
import DisplayOrders from "../../components/DisplayOrders";

const Orders =()=>{
    const [orders,setOrders] = useState()
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                const res = await getBuyerOrderInfo(token)
                if(res){
                    if(res.data.statusCode === 200){
                        setOrders(res.data.data)
                    }
                    console.log("res",res.data.data)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        fetchOrders()
    },[token])
    
    return(
        <Container
        maxWidth="lg"
        sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
      >
          <h1>Orders</h1>
          {orders ? <Fragment>
            {orders.length > 0 ? <Fragment>{orders.map((item,id)=>{
            return <DisplayOrders key ={id} order={item}/>
          })}
          </Fragment> :<div>No Orders Found</div>}
          </Fragment>:<div>Loading...</div>}
         
      </Container>
    )
}
export default Orders;