import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getProductsByUser = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_PRODUCT_BY_USER}`,
        method: 'GET',
        token
    });
}