
import { Fragment, useEffect,useState } from "react"
import {getBuyers} from "../../apis/admin/getBuyers"
import {Container} from "@mui/material";
import UserBuyerTable from "../../components/UserBuyerTable"

const UsersManagement =()=>{
    const [buyers,setBuyers] = useState()
    const token = JSON.parse(localStorage.getItem("token"));
    const [refetch, setRefetch] = useState(false)
    const handleRefetch=()=>{
        setRefetch(!refetch)
    }
    useEffect(()=>{
     const fetchSellers =async()=>{
        const res = await getBuyers(token)
        console.log("res", res.data.data.buyers)
        if(res.remote === "success"){
            if(res.data.statusCode === 200)
            setBuyers(res.data.data.buyers)
        }
        if(res.remote === "failure"){
           alert(res.errors.errors)
        }
     }
     fetchSellers()
    },[token])
    return(
        <Container
        maxWidth="lg"
        sx={{ padding: "20px 0px", minHeight: "85vh", textAlign: "center" }}
      >
          <UserBuyerTable buyers={buyers} handleRefetch={handleRefetch} />
      </Container>
    )
}
export default UsersManagement