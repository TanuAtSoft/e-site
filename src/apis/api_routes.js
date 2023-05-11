export const API_ROUTES = {
    SIGN_UP: {
        REGISTER: 'register',
    },
    SIGN_IN: {
        LOGIN:'login',
        // CHANGE_PASS:'changePassword',
        // FORGOT_PASS:'forgotPassword',
        // RESET_PASS:'resetPassword'
    },
    PRODUCTS:{
        GET_ALL: "products",
        GET_ONE: "product",
        ADD_PRODUCT:"addProducts"
    },
    ADDRESS:{
        GET_ADDRESS: "getAddress",
        ADD_ADDRESS:"addAddress"
    },
    UPLOAD:{
        IMAGES:"upload/images"
    },
    CART:{
        ADD_TO_CART:"addToCart",
        GET_CART_DETAILS:"getCart",
        REMOVE_CART_ITEM:"deleteCartItem",
        DELETE_CART_ITEM:"deleteItemFromCart"
    },
    PAYMENT:{
        CREATE_PAYMENT:"createOrder" , 
        VERIFY_PAYMENT:"verifyPayment"
    },
    ORDER:{
        SAVE_ORDER:"saveOrder"
    }
}