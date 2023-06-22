import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getBestDealProducts = () => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_BEST_DEALS_PRODUCT}`,
        method: 'GET'
    });
}