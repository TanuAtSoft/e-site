import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const removeItemFromCart = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CART.REMOVE_CART_ITEM}`,
        method: 'PUT', 
        data,
        token
    });
}