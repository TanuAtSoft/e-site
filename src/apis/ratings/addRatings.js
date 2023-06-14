import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addRatings = async(token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.RATINGS.ADD_RATINGS}`,
        method: 'PATCH', 
        data,
        token
    });
}