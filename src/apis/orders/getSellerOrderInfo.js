import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellerOrderInfo = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.GET_SELLER_ORDER_INFO}`,
        method: 'GET', 
       token
    });
}