import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coupon: JSON.parse(localStorage.getItem('coupon')) || null,
};

export const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {

        applyCoupon(state, action) {
            const { discount, condition } = action.payload; 
            if (discount !== undefined && condition !== undefined) {
                state.coupon = {
                    number: discount,
                    condition: condition,
                };
                toast.success('Mã giảm giá đã được áp dụng!');
            } else {
                toast.error('Mã giảm giá không hợp lệ!');
            }
            localStorage.setItem('coupon', JSON.stringify(state.coupon)); // Save coupon to localStorage
        },
        

        clearCoupon(state) {
            state.coupon = null;
            toast.info('Mã giảm giá đã được xóa!');
            localStorage.removeItem('coupon'); // Remove coupon from localStorage
        },
    }
});

export const {
   
    applyCoupon,
    clearCoupon
} = couponSlice.actions;

const couponReducer = couponSlice.reducer;
export default couponReducer;