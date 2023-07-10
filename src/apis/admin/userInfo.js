import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const getUserInfo = (id) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ADMIN.GET_USER_INFO}/${id}`,
        method: 'GET'
    });
}