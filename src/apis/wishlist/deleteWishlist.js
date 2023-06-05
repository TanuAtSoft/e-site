import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const adeleteWishlist = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.WISHLIST.DELETE_WISHLISTBYID}`,
        method: 'PATCH', 
        data,
        token
    });
}