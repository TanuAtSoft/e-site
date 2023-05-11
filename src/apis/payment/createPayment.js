import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";
import axios from "axios";

export const createPayment = async(token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PAYMENT.CREATE_PAYMENT}`,
        method: 'POST', 
        data,
        token
    });
}

