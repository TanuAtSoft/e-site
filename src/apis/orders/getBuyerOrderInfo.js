import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getBuyerOrderInfo = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.GET_BUYER_ORDER_INFO}`,
        method: 'GET', 
       token
    });
}