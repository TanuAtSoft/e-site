import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const forgotPassword = (data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PROFILE.FORGOT_PASSWORD}`,
        method: 'POST', 
        data
    });
}