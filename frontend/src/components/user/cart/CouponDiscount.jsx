import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon, clearCoupon } from "../../../redux/slices/couponSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartItem() {
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  // Handle form submission for coupon code
  const handleApplyCoupon = async (e) => {
    e.preventDefault(); // Ensure e is an event object

    try {
      // Send the coupon code to the API
      const response = await axios.post(
        "http://127.0.0.1:8000/api/check-coupon",
        {
          coupon: couponCode,
        }
      );
      console.log("API Response:", response.data);

      // Check response and dispatch the appropriate action
      if (response.data.success) {
        const { coupon } = response.data;
        const { number: discount, condition: condition } = coupon;
        // Kiểm tra xem giá trị này có đúng không

        // console.log("Dispatching coupon with discount:", discount, "and condition:", condition);
        // dispatch(applyCoupon({ discount, condition })); 
        
        // if (coupon.condition === 1) {
        //   setMessage(`Coupon applied! Discount: ${discount}%`);
        // } else if (coupon.condition === 2) {
        //   setMessage(`Coupon applied! Discount: ${discount.toLocaleString("vi-VN")}đ`);

        console.log(
          "Dispatching coupon with discount:",
          discount,
          "and condition:",
          condition
        );
        dispatch(applyCoupon({ discount, condition, code, used }));

        // Handle success case, update the message based on coupon condition
        if (condition === 1) {
          setMessage(`Coupon applied! Discount: ${discount}%`);
        } else if (condition === 2) {
          setMessage(
            `Coupon applied! Discount: ${discount.toLocaleString("vi-VN")}đ`
          );
        }
         
       
      } else {
        setMessage(response.data.message || "Invalid coupon code.");
      }
    } catch (error) {
      if (used===true) {
        toast.error("Mã giảm giá đã được sử dụng, vui lòng nhập mã khác");
      }
      setMessage("An error occurred while applying the coupon.");
      console.error("Error applying coupon:", error);
    }
  };

  const clearCouponCode = () => {
    dispatch(clearCoupon());
    setMessage("Coupon has been cleared.");
  };

  return (
    <div className="col-lg-4 col-md-12 col-12">
      <div className="coupon-wrap mb-40">
        <h4>Giảm giá tích điểm</h4>
        <div className="coupon-content common-form-style">
          <p>Nhập mã tích điểm của bạn nếu bạn có.</p>
          <form onSubmit={handleApplyCoupon}>
            {" "}
            {/* Use consistent function name */}
            <div className="input-style coupon-content-mrg">
              <input
                type="text"
                placeholder="Mã tích điểm"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <div className="common-btn-style">
              <button type="submit" className="common-btn-padding-2">
                Áp dụng tích điểm
              </button>
            </div>
          </form>
          <div className="common-btn-style">
            <button
              type="button"
              className="button-del-coupon"
              onClick={clearCouponCode} // Clear coupon handler
            >
              <i className="fal fa-times"></i> Xóa mã giảm giá
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
