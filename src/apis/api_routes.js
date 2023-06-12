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
        ADD_PRODUCT:"addProducts",
        GET_PRODUCT_BY_USER:"getProductByUser",
        DELETE_PRODUCT_BY_ID:"softDeleteProduct",
        EDIT_PRODUCT_BY_ID:"editProduct"
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
        GET_CART_LENGTH:"getCartLength",
        REMOVE_CART_ITEM:"deleteCartItem",
        DELETE_CART_ITEM:"deleteItemFromCart"
    },
    PAYMENT:{
        CREATE_PAYMENT:"createOrder" , 
        VERIFY_PAYMENT:"verifyPayment"
    },
    ORDER:{
        SAVE_ORDER:"saveOrder",
        GET_SELLER_ORDER_INFO:"getOrderInfo",
        UPDATE_ORDER_INFO: "updateOrderStatus",
        GET_BUYER_ORDER_INFO:"getBuyerOrderInfo"
    },
    WISHLIST:{
        ADD_TO_WISHLISTBYID:"addWishlist",
        DELETE_WISHLISTBYID:"deleteWishlist",
        GET_WISHLIST:"getWishlist",
        GET_WISHLIST_LENGTH:"getWishlistLength"
    },
    SELLER:{
        GET_SELLER_DASHBOARD_METRICS:"getSellerMatricsInfo",
        GET_SELLER_STOCK_INFO:"sellerStocksInfo"
    }
}