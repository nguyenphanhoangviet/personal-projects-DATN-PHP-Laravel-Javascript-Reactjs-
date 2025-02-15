import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "animate.css";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function Index() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({}); // Khởi tạo dưới dạng đối tượng rỗng

  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store the token in localStorage and clear token from URL
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/dashboard"); // Adjust the path if needed

      Swal.fire({
        icon: "success",
        title: "Đăng Nhập Thành Công",
        text: "Bạn sẽ được chuyển hướng đến bảng điều khiển.",
      });
    } else if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/auth/your_profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Đặt chi tiết người dùng trực tiếp từ response.data
        setUserDetails(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Xác Thực Thất Bại",
            text: "Vui lòng đăng nhập lại.",
          }).then(() => {
            navigate("/login");
          });
        } else {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
      }
    };
    fetchUserDetails();
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme animate__animated animate__fadeInDown"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
          <Link className="nav-item nav-link px-0 me-xl-6" to="/">
            <i className="bx bx-menu bx-md"></i>
          </Link>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search bx-md"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none ps-1 ps-sm-2"
                placeholder="Tìm kiếm..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-4">
              <a
                className="github-button"
                href="/"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themeselection/sneat-html-admin-template-free trên GitHub"
              >
                {userDetails.name}
              </a>
            </li>

            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <Link
                className="nav-link dropdown-toggle hide-arrow p-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="/assets/img/avatars/1.png"
                    alt="Hình đại diện người dùng"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src="/assets/img/avatars/1.png"
                            alt="Hình đại diện người dùng"
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{userDetails.name}</h6>
                        <small className="text-muted">Quản trị viên</small>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bx bx-user bx-md me-3"></i>
                    <span>Thông Tin Cá Nhân</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <i className="bx bx-cog bx-md me-3"></i>
                    <span>Cài Đặt</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 bx bx-credit-card bx-md me-3"></i>
                      <span className="flex-grow-1 align-middle">
                        Gói Thanh Toán
                      </span>
                      <span className="flex-shrink-0 badge rounded-pill bg-danger">
                        4
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider my-1"></div>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    <i className="bx bx-power-off bx-md me-3"></i>
                    <span>Đăng Xuất</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </motion.div>
  );
}
