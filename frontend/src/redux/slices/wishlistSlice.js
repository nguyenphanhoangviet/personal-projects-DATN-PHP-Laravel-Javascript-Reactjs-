import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList(state, action) {
      const item = action.payload;
      let existingItem = state.wishlist.find(product => product.id === item.id);
      if (!existingItem) {
        item.favorite = (item.favorite || 0) + 1; 
        state.wishlist = [item, ...state.wishlist];
        toast.success('Sản phẩm đã được thêm vào danh sách yêu thích');
      } else {
        toast.info('Sản phẩm đã có trong danh sách yêu thích');
      }
       // Lưu vào localStorage ngay sau khi cập nhật wishlist
       localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
    removeFromWishList(state, action) {
      const item = action.payload;
      const existingItem = state.wishlist.find(product => product.id === item.id);
    
      if (existingItem) {
        state.wishlist = state.wishlist.filter(product => product.id !== item.id);
        toast.success('Sản phẩm đã được xóa khỏi danh sách yêu thích');
      } else {
        toast.info('Sản phẩm không có trong danh sách yêu thích');
      }
      // Lưu vào localStorage sau khi xóa sản phẩm
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const {
  addToWishList,
  removeFromWishList,
} = wishlistSlice.actions;

const wishlistReducer = wishlistSlice.reducer;
export default wishlistReducer;
