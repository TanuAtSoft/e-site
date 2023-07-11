import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getBuyers = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.GET_BUYERS}`,
        method: 'GET',
        token
    });
}