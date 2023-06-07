import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const deleteSingleProductById = (token,id) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PRODUCTS.DELETE_PRODUCT_BY_ID}/${id}`,
        method: 'PATCH',
        token
    });
}