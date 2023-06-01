import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const updateOrderInfo = async(token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.UPDATE_ORDER_INFO}`,
        method: 'PATCH', 
        data,
        token
    });
}