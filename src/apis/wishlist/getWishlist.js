import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getWishlistDetails = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.WISHLIST.GET_WISHLIST}`,
        method: 'GET',
        token
    });
}