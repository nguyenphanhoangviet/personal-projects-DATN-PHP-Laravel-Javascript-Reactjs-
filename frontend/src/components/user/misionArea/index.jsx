
import React from "react";
import Counter from "../../../hooks/user/counterUp";

export default function Index() {
  return (
    <div className="mision-area bg-gray-2 pt-65 pb-45">
      <div className="container">
        <div className="section-title-2 mb-45 wow tmFadeInUp">
          <h2>
            Chúng tôi cung cấp và mở rộng các dịch vụ chăm sóc sức khỏe cá nhân
            hóa và sáng tạo cho khách hàng.
          </h2>
          <p>
            Chúng tôi vừa mới tổ chức một văn phòng mới tại 33 Queens Square,
            Leeds để đáp ứng sự phát triển kinh doanh tại khu vực phía Bắc Vương
            quốc Anh và Scotland.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12 col-sm-6 wow tmFadeInUp">
            <div className="medizin-box mb-30" data-vivus-hover>
              <div className="icon-box-wrapper">
                <div className="medizin-icon-wrap">
                  <img
                    className="svgInject"
                    src="assets/images/icon-img/linea-basic-compass.svg"
                    alt=""
                  />
                </div>
                <div className="icon-box-content">
                  <div className="title">
                    <h3>Tầm Nhìn Của Chúng Tôi</h3>
                  </div>
                  <ul>
                    <li>Dịch Vụ Tốt</li>
                    <li>Vì Cộng Đồng</li>
                    <li>Phát Triển Dài Hạn</li>
                    <li>Bảo Vệ Hành Tinh</li>
                    <li>Giúp Đỡ Mọi Người</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 col-sm-6 wow tmFadeInUp">
            <div className="medizin-box mb-30" data-vivus-hover>
              <div className="icon-box-wrapper">
                <div className="medizin-icon-wrap">
                  <img
                    className="svgInject"
                    src="assets/images/icon-img/linea-basic-flag2.svg"
                    alt=""
                  />
                </div>
                <div className="icon-box-content">
                  <div className="title">
                    <h3>Lời Hứa Của Chúng Tôi</h3>
                  </div>
                  <ul>
                    <li>Mối Quan Hệ Bền Vững</li>
                    <li>Tái Cam Kết</li>
                    <li>Cung Cấp Giải Pháp Tốt Nhất</li>
                    <li>Mối Quan Hệ Có Lợi</li>
                    <li>Thích Ứng Với Nhu Cầu Của Mọi Người</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-12 col-sm-6 wow tmFadeInUp">
            <div className="medizin-box mb-30" data-vivus-hover>
              <div className="icon-box-wrapper">
                <div className="medizin-icon-wrap">
                  <img
                    className="svgInject"
                    src="assets/images/icon-img/linea-basic-life-buoy.svg"
                    alt=""
                  />
                </div>
                <div className="icon-box-content">
                  <div className="title">
                    <h3>Sứ Mệnh Của Chúng Tôi</h3>
                  </div>
                  <ul>
                    <li>Thay Đổi Thói Quen</li>
                    <li>Chất Lượng Tốt Nhất</li>
                    <li>Suy Nghĩ Lớn, Hành Động Lớn Hơn</li>
                    <li>Ổn Định & Năng Lực</li>
                    <li>Cuộc Sống An Toàn & Tốt Hơn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
