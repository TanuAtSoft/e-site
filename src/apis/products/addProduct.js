import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addProduct = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.ADD_PRODUCT}`,
        method: 'POST', 
        data,
        token
    });
}