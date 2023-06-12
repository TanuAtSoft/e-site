import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellerBestSoldMetrics = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SELLER.GET_SELLER_BEST_SOLD_INFO}`,
        method: 'GET', 
       token
    });
}