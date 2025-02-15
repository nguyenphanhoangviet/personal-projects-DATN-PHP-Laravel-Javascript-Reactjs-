import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./style.scss";

const Breadcrumb = () => {
  // Lấy đường dẫn hiện tại và tách thành các phần
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Tách đường dẫn thành các phần
  const breadcrumbNameMap = {
    "/about": "Giới thiệu",
    "/shop": "Cửa hàng",
    "/contact": "Liên hệ",
    "/blog": "Bài viết",
    "/cart": "Giỏ hàng",
    "/product": "Sản phẩm",
    "/product-detail": "Chi tiết sản phẩm",
    "/login-register": "Đăng nhập - Đăng ký",
  };

  const slug = pathnames[pathnames.length - 1]; 

  // Nếu người dùng đang ở trang chủ thì không hiển thị Breadcrumb
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="breadcrumb-area breadcrumb-area-padding-2 bg-gray-2">
      <div className="custom-container">
        <div className="breadcrumb-content text-center">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1; // Kiểm tra xem có phải mục cuối cùng không
              const name =
                breadcrumbNameMap[to] ||
                (isLast && slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : value.charAt(0).toUpperCase() + value.slice(1));

              return (
                <li
                  key={to}
                  className={`${isLast ? "active" : ""}`} // Thêm class "active" nếu là mục cuối
                >
                  {isLast ? (
                    name
                  ) : (
                    <Link to={to}>{name}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
