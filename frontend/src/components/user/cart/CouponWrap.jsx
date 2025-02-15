import { Link } from "react-router-dom";
import CouponDiscount from "./CouponDiscount";
import CartCollaterals from "./CartCollaterals";
import GrandTotal from "./GrandTotal";

export default function CouponWrap() {
  
  return (
    <div className="row">
        <CouponDiscount />
      <div className="col-lg-8 col-md-12 col-12">
        <div className="row">
            <CartCollaterals />
            <GrandTotal /> 
        </div>
      </div>
    </div>
  );
}
