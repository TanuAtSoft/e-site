import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSearchedProducts = (text) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_PRODUCTS_BY_SEARCH}/${text}`,
        method: 'GET'
    });
}