import { API_ROUTES } from "../api_routes";
import { apiRoot } from "../root";

export const addSellerVerificationDoc = (token,data) => {  
    return apiRoot({ 
        url: `/${API_ROUTES.VERIFICATION_DOC.SELLER_VERIFICATION_DOC}`,
        method: 'POST', 
        data,
        token
    });
}