import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const deleteWishlist = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.WISHLIST.DELETE_WISHLISTBYID}`,
        method: 'PATCH', 
        data,
        token
    });
}