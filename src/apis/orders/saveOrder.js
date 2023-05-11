import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const saveOrder = async(token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.SAVE_ORDER}`,
        method: 'POST', 
        data,
        token
    });
}