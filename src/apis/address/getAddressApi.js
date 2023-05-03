import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getAddress = (token) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADDRESS.GET_ADDRESS}`,
        method: 'GET',
        token
    });
}