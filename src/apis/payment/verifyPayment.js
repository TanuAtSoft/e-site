import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";
import axios from "axios";

export const verifyPayment = async(token,data) => {  
 
    return apiRoot({ 
        url: `${API_ROUTES.PAYMENT.VERIFY_PAYMENT}`,
        method: 'POST', 
        data,
        token
    });
}