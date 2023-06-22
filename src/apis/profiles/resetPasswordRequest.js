import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const resetPasswordRequest = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.PROFILE.RESET_PASSWORD_REQUEST}`,
        method: 'POST', 
        data,
        token
    });
}