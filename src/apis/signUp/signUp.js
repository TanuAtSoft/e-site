import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const signUp = (data) => {  
    console.log("process", process.env.REACT_APP_BASE_API_URL)
    return apiRoot({ 
        url: `/${API_ROUTES.SIGN_UP.REGISTER}`,
        method: 'POST', 
        data,
    });
}