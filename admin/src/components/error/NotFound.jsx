import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-xxl container-p-y" style={{ textAlign: "center" }}>
      <div className="misc-wrapper">
        <h1 className="mb-2 mx-2" style={{ lineHeight: "6rem", fontSize: "6rem" }}>404</h1>
        <h4 className="mb-2 mx-2">Trang không tìm thấy ⚠️</h4>
        <p className="mb-6 mx-2">Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm</p>
        <Link to="/" className="btn btn-primary">Quay lại trang chính</Link>
        <div className="mt-6">
          <img
            src="../assets/img/illustrations/page-misc-error-light.png"
            alt="page-misc-error-light"
            width="500"
            className="img-fluid"
            data-app-light-img="illustrations/page-misc-error-light.png"
            data-app-dark-img="illustrations/page-misc-error-dark.png"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
