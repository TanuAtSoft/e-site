import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const verifySeller = (token,id) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.VERIFY_SELLER}/${id}`,
        method: 'PATCH',
        token
    });
}