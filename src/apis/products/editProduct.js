import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const editProduct = (token,id,data) => { 
    delete data._id
     delete data.__v
     delete data.softDeleted
     delete data.seller
     delete data.reviews
    return apiRoot({ 
        url:  `/${API_ROUTES.PRODUCTS.EDIT_PRODUCT_BY_ID}/${id}`,
        method: 'PATCH', 
        data,
        token
    });
}