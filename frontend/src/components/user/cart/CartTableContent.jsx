import React from "react"; // Đừng quên import React
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector
import CartItem from "./CartItem";

export default function CartTableContent() {
  const cartItems = useSelector((state) => state.cart.cartItems); // Lấy danh sách sản phẩm từ Redux store
  const dispatch = useDispatch();
  const sub_total = cartItems.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );

  return (
    <div className="row">
      <div className="col-12">
        <form action="#">
          <div className="cart-table-content">
            <div className="table-content table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="width-thumbnail">Sản phẩm</th>
                    <th className="width-name"></th>
                    <th className="width-price">Giá</th>
                    <th className="width-quantity">Số lượng</th>
                    <th className="width-subtotal">Thành tiền</th>
                    <th className="width-remove"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} /> // Truyền từng sản phẩm vào CartItem
                  ))}
                </tbody>
                <thead>
                  <tr>
                    <td colSpan={3} className="px-0">
                      <th className="width-thumbnail">Tổng cộng</th>
                    </td>
                    <td></td>
                    <th className="text-center">
                      <span className="total-price-cart">
                        {sub_total.toLocaleString("vi-VN")}đ
                      </span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="cart-shiping-update-wrapper">
              <div className="continure-clear-btn">
                <div className="continure-btn">
                  <a href="#">Tiếp tục mua sắm</a>
                </div>
                <div className="clear-btn">
                  <a href="#">
                    <i className="fal fa-times"></i> Xóa giỏ hàng
                  </a>
                </div>
              </div>
              {/* <div className="update-btn">
                <a href="cart.html">Cập nhật giỏ hàng</a>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
