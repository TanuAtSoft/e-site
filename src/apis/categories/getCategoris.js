import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

 const getMainCategories = () => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CATEGORIES.GET_MAIN_CATEGORIES}`,
        method: 'GET'
    });
}

 const getSubCategories = () => {  
    return apiRoot({ 
        url: `/${API_ROUTES.CATEGORIES.GET_SUB_CATEGORIES}`,
        method: 'GET'
    });
}
export {getMainCategories,getSubCategories}