import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const signUp = (data) => { 
    return apiRoot({ 
        url: `/${API_ROUTES.SIGN_UP.REGISTER}`,
        method: 'POST', 
        data,
    });
}