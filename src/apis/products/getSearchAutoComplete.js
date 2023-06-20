import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSearchAutoComplete = (text) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_SEARCH_AUTO_COMPLETE}/${text}`,
        method: 'GET'
    });
}