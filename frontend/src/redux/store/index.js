import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import couponReducer from "../slices/couponSlice";
import wishlistReducer from "../slices/wishlistSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        coupon: couponReducer,
        wishlist: wishlistReducer
    }
})

export default store