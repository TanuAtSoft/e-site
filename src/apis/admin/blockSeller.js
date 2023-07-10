import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const blockSeller = (token,id) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.BLOCK_SELLER}/${id}`,
        method: 'PATCH',
        token
    });
}