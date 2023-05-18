import { useState, useEffect, Fragment } from "react"
import {getSellerOrderInfo} from "../../apis/orders/getSellerOrderInfo"
const SellerDashboard=()=>{
    const [orderedItems,setOrderedItems] = useState()
    let token = JSON.parse(localStorage.getItem("token"));

    useEffect(()=>{
        const fetchOrder =async()=>{
        const res = await getSellerOrderInfo(token)
        setOrderedItems(res.data.data)
        }
        fetchOrder()
    },[])
    console.log("orderedItems",orderedItems)
    
    return(
        <Fragment>
            
        </Fragment>
    )
}
export default SellerDashboard