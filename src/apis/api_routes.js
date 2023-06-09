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
    PROFILE:{
        RESET_PASSWORD: "resetPassword",
        FORGOT_PASSWORD: "forgotPassword",
        RESET_PASSWORD_REQUEST:"resetPasswordRequest"
    },
    PRODUCTS:{
        GET_ALL: "products",
        GET_ONE: "product",
        GET_TOP_RATED_PRODUCTS:"getTopRated",
        ADD_PRODUCT:"addProducts",
        GET_PRODUCT_BY_USER:"getProductByUser",
        DELETE_PRODUCT_BY_ID:"softDeleteProduct",
        EDIT_PRODUCT_BY_ID:"editProduct",
        GET_PRODUCTS_BY_CATEGORY:"getProductsByCategory",
        GET_PRODUCTS_BY_SEARCH:"getProductsBySearch",
        GET_SEARCH_AUTO_COMPLETE:"getSearchAutoComplete",
        GET_BEST_DEALS_PRODUCT:"getBestDealProducts"
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
        GET_ALL_ORDERS:"getOrders",
        GET_SELLER_ORDER_INFO:"getOrderInfo",
        UPDATE_ORDER_INFO: "updateOrderStatus",
        GET_BUYER_ORDER_INFO:"getBuyerOrderInfo",
        GET_MOST_SOLD_PRODUCTS:"bestSeller",
        CANCEL_ORDER:"cancelOrder"
    },
    WISHLIST:{
        ADD_TO_WISHLISTBYID:"addWishlist",
        DELETE_WISHLISTBYID:"deleteWishlist",
        GET_WISHLIST:"getWishlist",
        GET_WISHLIST_LENGTH:"getWishlistLength"
    },
    SELLER:{
        GET_SELLER_DASHBOARD_METRICS:"getSellerMatricsInfo",
        GET_SELLER_STOCK_INFO:"sellerStocksInfo",
        GET_SELLER_REVENUE_INFO:"sellerRevenueInfo",
        GET_SELLER_BEST_SOLD_INFO:"sellerBestSellerInfo"
    },
    RATINGS:{
        ADD_RATINGS:"reviewProduct"
    },
    CATEGORIES:{
        GET_MAIN_CATEGORIES:"getMainCategory",
        GET_SUB_CATEGORIES:"getSubCategory"
    },
    ADMIN:{
        GET_SELLERS:"getSeller",
        BLOCK_SELLER:"blockSeller",
        GET_USER_INFO:"userInfo",
        VERIFY_USER:"verifyUser",
        VERIFY_SELLER:"verifySeller",
        GET_BUYERS:"getBuyers"
    },
    VERIFICATION_DOC:{
        SELLER_VERIFICATION_DOC:"uploadSellerVerificationDoc"
    }
}