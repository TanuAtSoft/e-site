import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getBestSeller = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.GET_MOST_SOLD_PRODUCTS}`,
        method: 'GET'
    });
}