
import React from "react";
import CounterUp from "../../../hooks/user/counterUp";
import Style from "./style.scss";

export default function Index() {
  return (
    <div className="about-us-area fix about-us-img pt-65 pb-75">
      <div className="container">
        <div className="section-title-2 mb-35 wow tmFadeInUp">
          <h2>
            {" "}
            Công ty chúng tôi cung cấp và mở rộng các dịch vụ chăm sóc sức khỏe
            cá nhân hóa và sáng tạo cho khách hàng.
          </h2>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-us-img wow tmFadeInUp">
              <img src="assets/images/banner/banner-9.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-content wow tmFadeInUp">
              <div className="total-years">
                <h2 className="count">
                  <CounterUp end={29} duration={2} />
                </h2>
                <h4>
                  Năm <br />
                  Kinh nghiệm
                  <br />
                  Làm việc
                </h4>
              </div>
              <h3>Thiết bị và vật tư y tế chất lượng cao</h3>
              <p>
                Chúng tôi có hàng thập kỷ kinh nghiệm trong việc bán thiết bị y
                tế và vật tư cũng như quản lý các cơ sở chăm sóc sức khỏe. Chúng
                tôi đã thành lập Medizin Medical Supplies để cung cấp một cách
                dễ dàng cho các tổ chức mua sắm thiết bị và vật tư y tế chất
                lượng cao từ các nhà sản xuất hàng đầu.
              </p>
              <p>
                Sự hài lòng của khách hàng luôn là ưu tiên hàng đầu và sẽ luôn
                như vậy. Cảm ơn bạn đã ghé thăm trang web của chúng tôi. Chúng
                tôi mong được hợp tác với bạn!
              </p>
              {/* <div className="about-btn">
                <a href="#">
                  Khám phá ngay <i className="far fa-long-arrow-right"></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mouse-scroll-area-2" id="scene">
        <div data-depth="0.3" className="layer about-us-shape-1">
          <div className="medizin-shape"></div>
        </div>
      </div>
    </div>
  );
}

