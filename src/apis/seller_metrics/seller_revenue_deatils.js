import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellerRevenueMetrics = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SELLER.GET_SELLER_REVENUE_INFO}`,
        method: 'GET', 
       token
    });
}