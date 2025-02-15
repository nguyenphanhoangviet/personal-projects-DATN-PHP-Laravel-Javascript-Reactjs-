import React from "react";

export default function SidebarProductContent() {
  return (
    <div className="sidebar-widget sidebar-widget-wrap slidebar-product-wrap-2 sidebar-widget-padding-5 text-center mb-20">
      <div className="slidebar-product-content-2 text-center">
        <h3>KHẨU TRANG</h3>
        <h2>Khẩu Trang N95 Search Lab</h2>
      </div>
      <div className="slidebar-product-img-2 text-center">
        <a href="product-details.html">
          <img src="assets/images/product/product-banner-4.png" alt="" />
        </a>
        <div className="slidebar-pro-badge slidebar-pro-badge-position1">
          <h3>
            <span>12%</span>
            Giảm
          </h3>
        </div>
      </div>
      <div className="btn-style-1">
        <a className="font-size-14 btn-1-padding-4" href="product-details.html">
          Mua ngay
        </a>
      </div>
    </div>
  );
}
