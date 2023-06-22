import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const resetPassword = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PROFILE.RESET_PASSWORD}`,
        method: 'POST', 
        data,
        token
    });
}