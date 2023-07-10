import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const verifyUser = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.VERIFY_USER}`,
        method: 'PATCH',
        token
    });
}