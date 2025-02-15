import { useSelector } from "react-redux";
import Stripe from "../payments/Stripe";

export default function GrandTotal() {
  const { cartItems } = useSelector((state) => state.cart);
  const coupon = useSelector((state) => state.coupon.coupon);

  // Calculate subtotal
  const sub_total = (cartItems || []).reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  const shippingFee = 50000;

  // Calculate discount
  let discount = 0;
  if (coupon) {
    if (coupon.condition === 1) {
      // percentage discount
      discount = (sub_total * (coupon.number || 0)) / 100; // Ensure coupon.number is a number
    } else if (coupon.condition === 2) {
      // fixed discount in currency
      discount = (coupon.number || 0) ; // Ensure coupon.number is a number
    }
  }

  const total =sub_total- discount + shippingFee ;

  console.log("Coupon applied:", coupon);
  console.log("Subtotal:", sub_total);
  console.log("Shipping fee:", shippingFee);
  console.log("Discount:", discount);
  console.log("Total after discount:", total);
  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="grand-total-wrap mb-40">
        <ul>
          <li>
            Tổng phụ{" "}
            <h4>{sub_total ? sub_total.toLocaleString("vi-VN") : 0}đ</h4>
          </li>
          {coupon && (
            <li>
              Phí giảm giá{" "}
              <p>
                {coupon.condition === 1
                  ? `Mã giảm: ${coupon.number}%`
                  : `Mã giảm: ${
                      coupon.number ? coupon.number.toLocaleString("vi-VN") : 0
                    }đ`}
                <p>
                  Giảm giá: {discount ? discount.toLocaleString("vi-VN") : 0}đ
                </p>
              </p>
            </li>
          )}
          <li>
            Phí vận chuyển{" "}
            <h4>
              <span>Phí cố định:</span>
              {shippingFee.toLocaleString("vi-VN")}đ
            </h4>
          </li>
        </ul>
        <div className="grand-total">
          <h4>
            Tổng cộng{" "}
            <span>{total > 0 ? total.toLocaleString("vi-VN") : 0}đ</span>
          </h4>
        </div>

        <div className="grand-total-btn">{total > 50000 && <Stripe />}</div>
      </div>
    </div>
  );
}
