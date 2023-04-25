import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getCartDetails = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CART.GET_CART_DETAILS}`,
        method: 'GET',
        token
    });
}