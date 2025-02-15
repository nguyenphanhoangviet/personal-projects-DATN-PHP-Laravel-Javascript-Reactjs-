import React from "react";
import CartTableContent from "./CartTableContent";
import CouponWrap from "./CouponWrap";
import './style.scss';

export default function Index() {
  return (
    <div className="cart-area pt-75 pb-35">
            <div className="container">
                <CartTableContent />
                <CouponWrap />
            </div>
        </div>
  );
}
