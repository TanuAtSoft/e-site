import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getTopRatedProducts = () => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_TOP_RATED_PRODUCTS}`,
        method: 'GET'
    });
}