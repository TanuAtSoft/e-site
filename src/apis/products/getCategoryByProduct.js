import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getProductsByCategory = (cat) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_PRODUCTS_BY_CATEGORY}/${cat}`,
        method: 'GET'
    });
}