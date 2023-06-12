import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellerDashboardMetrics = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SELLER.GET_SELLER_DASHBOARD_METRICS}`,
        method: 'GET', 
       token
    });
}