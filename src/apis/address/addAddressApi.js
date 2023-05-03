import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addAddress = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADDRESS.ADD_ADDRESS}`,
        method: 'POST', 
        data,
        token
    });
}