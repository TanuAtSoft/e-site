import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getWishlistLength = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.WISHLIST.GET_WISHLIST_LENGTH}`,
        method: 'GET',
        token
    });
}