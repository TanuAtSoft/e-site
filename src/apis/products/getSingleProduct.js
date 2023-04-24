import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSingleProduct = (id) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.GET_ONE}/${id}`,
        method: 'GET'
    });
}