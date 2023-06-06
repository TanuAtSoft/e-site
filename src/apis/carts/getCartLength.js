import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getCartLength = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CART.GET_CART_LENGTH}`,
        method: 'GET',
        token
    });
}