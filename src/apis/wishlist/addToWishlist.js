import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addToWishlist = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.WISHLIST.ADD_TO_WISHLISTBYID}`,
        method: 'PATCH', 
        data,
        token
    });
}