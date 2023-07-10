import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getSellers = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.GET_SELLERS}`,
        method: 'GET',
        token
    });
}