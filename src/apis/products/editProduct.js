import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const editProduct = (token,id,data) => {  
    return apiRoot({ 
        url:  `/${API_ROUTES.PRODUCTS.EDIT_PRODUCT_BY_ID}/${id}`,
        method: 'PATCH', 
        data,
        token
    });
}