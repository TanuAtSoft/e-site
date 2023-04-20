import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getProducts = () => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_ALL}`,
        method: 'GET'
    });
}