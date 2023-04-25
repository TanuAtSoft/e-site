import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addToCart = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CART.ADD_TO_CART}`,
        method: 'PATCH', 
        data,
        token
    });
}