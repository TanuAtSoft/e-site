import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const signIn = (data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.SIGN_IN.LOGIN}`,
        method: 'POST', 
        data,
    });
}