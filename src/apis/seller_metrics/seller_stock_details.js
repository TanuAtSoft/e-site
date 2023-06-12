import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellerStockMetrics = async(token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SELLER.GET_SELLER_STOCK_INFO}`,
        method: 'GET', 
       token
    });
}