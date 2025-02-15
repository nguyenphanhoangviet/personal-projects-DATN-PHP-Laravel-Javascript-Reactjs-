
import { Link } from "react-router-dom";

export default function CartCollaterals() {
  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="cart-collaterals-wrap mb-40">
        <h4>Giảm giá Coupon</h4>
        <div className="collaterals-content common-form-style">
          <p>
            Phí cố định: <span>$5.00</span>
          </p>
          <div className="select-style select-style-mrg-1">
            <select className="select-active">
              <option>Hoa Kỳ (US)</option>
              <option>Uganda</option>
              <option>Ukraine</option>
              <option>Bangladesh</option>
              <option>Barbados</option>
            </select>
          </div>
          <div className="select-style select-style-mrg-1">
            <select className="select-active">
              <option>Arizona</option>
              <option>Uganda</option>
              <option>Ukraine</option>
              <option>Bangladesh</option>
              <option>Barbados</option>
            </select>
          </div>
          <div className="input-style input-style-mb">
            <input type="text" placeholder="Thành phố" />
          </div>
          <div className="input-style input-style-mb">
            <input type="text" placeholder="Mã bưu điện / ZIP" />
          </div>
          {/* <div className="common-btn-style">
            <a className="common-btn-padding-2 common-btn-outline" href="#">
              Cập nhật
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

