import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const deleteItemFromCart = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CART.DELETE_CART_ITEM}`,
        method: 'DELETE', 
        data,
        token
    });
}