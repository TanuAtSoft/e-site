import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const cancelOrder = async(token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.ORDER.CANCEL_ORDER}`,
        method: 'PATCH', 
        data,
        token
    });
}