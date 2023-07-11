import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getAllOrders = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.GET_ALL_ORDERS}`,
        method: 'GET',
        token
    });
}