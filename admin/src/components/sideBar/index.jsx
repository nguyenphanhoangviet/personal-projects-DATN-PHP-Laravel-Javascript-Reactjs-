import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  // State để theo dõi mục menu đang hoạt động
  const [activeMenu, setActiveMenu] = useState("/");

  // Hàm xử lý khi nhấp vào mục menu
  const handleMenuClick = (path) => {
    setActiveMenu(path);
  };

  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <Link to="/" className="app-brand-link">
          <span className="app-brand-logo demo"></span>
          <span className="app-brand-text demo menu-text fw-bold ms-2">sneat</span>
        </Link>

        <a
          href="/"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        <li className={`menu-item ${activeMenu === "/" ? "active open" : ""}`}>
          <Link to="/" className="menu-link" onClick={() => handleMenuClick("/")}>
            <i className="menu-icon tf-icons bx bx-home-smile"></i>
            <div className="text-truncate" data-i18n="Dashboards">
              Bảng điều khiển
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/orders" ? "active open" : ""}`}>
          <Link to="/orders" className="menu-link" onClick={() => handleMenuClick("/orders")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Đơn hàng">
              Đơn hàng
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/brands" ? "active open" : ""}`}>
          <Link to="/brands" className="menu-link" onClick={() => handleMenuClick("/brands")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Thương hiệu">
              Thương hiệu
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/categories" ? "active open" : ""}`}>
          <Link to="/categories" className="menu-link" onClick={() => handleMenuClick("/categories")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Danh mục">
              Danh mục
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/product-types" ? "active open" : ""}`}>
          <Link to="/product-types" className="menu-link" onClick={() => handleMenuClick("/product-types")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Dạng sản phẩm">
              Dạng sản phẩm
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/products" ? "active open" : ""}`}>
          <Link to="/products" className="menu-link" onClick={() => handleMenuClick("/products")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Sản phẩm">
              Sản phẩm
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/roles" ? "active open" : ""}`}>
          <Link to="/roles" className="menu-link" onClick={() => handleMenuClick("/roles")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Vai trò">
              Vai trò
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/users" ? "active open" : ""}`}>
          <Link to="/users" className="menu-link" onClick={() => handleMenuClick("/users")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Người dùng">
              Người dùng
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/banners" ? "active open" : ""}`}>
          <Link to="/banners" className="menu-link" onClick={() => handleMenuClick("/banners")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Quảng cáo">
              Banners
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/category_posts" ? "active open" : ""}`}>
          <Link to="/category_posts" className="menu-link" onClick={() => handleMenuClick("/category_posts")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Danh mục bài viết">
              Danh mục bài viết
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/posts" ? "active open" : ""}`}>
          <Link to="/posts" className="menu-link" onClick={() => handleMenuClick("/posts")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Bài viết">
              Bài viết
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/warehouses" ? "active open" : ""}`}>
          <Link to="/warehouses" className="menu-link" onClick={() => handleMenuClick("/warehouses")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Nhà kho">
              Nhà kho
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/coupons" ? "active open" : ""}`}>
          <Link to="/coupons" className="menu-link" onClick={() => handleMenuClick("/coupons")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Mã khuyến mãi">
              Mã khuyến mãi
            </div>
          </Link>
        </li>
        <li className={`menu-item ${activeMenu === "/comments" ? "active open" : ""}`}>
          <Link to="/comments" className="menu-link" onClick={() => handleMenuClick("/comments")}>
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div className="text-truncate" data-i18n="Bình luận đánh giá">
              Bình luận đánh giá
            </div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/login">
            <button type="button" className="btn btn-primary">
              Đăng Nhập
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
