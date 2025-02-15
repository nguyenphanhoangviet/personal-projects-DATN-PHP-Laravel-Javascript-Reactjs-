import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errors, setErrors] = useState({}); // Lưu lỗi ở đây
  const [captchaReady, setCaptchaReady] = useState(false);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setCaptchaReady(true);
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LdPo2oqAAAAAI3NTsOV8sCti5T2SODCiC20eZHa",
          });
        });
      }
    };

    // Ensure reCAPTCHA is loaded after component mounts
    if (typeof window.grecaptcha === "undefined") {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.body.appendChild(script);
    } else {
      loadRecaptcha();
    }
  }, []);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Tên không được để trống.";
    }
    if (!emailRegex.test(email)) {
      validationErrors.email = "Email không hợp lệ.";
    }
    if (password.length < 6) {
      validationErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (password !== password2) {
      validationErrors.password2 = "Mật khẩu không khớp.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!captchaReady) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "reCAPTCHA chưa sẵn sàng. Vui lòng thử lại sau.",
      });
      return;
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng xác minh reCAPTCHA.",
      });
      return;

    }

    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
        password2,
        "g-recaptcha-response": recaptchaResponse,
      });

      if (response && response.data) {
        Swal.fire({
          icon: "success",
          title: "Đăng Ký Thành Công",
          text: "Bạn có thể  đăng nhập ngay bây giờ.",
        }).then(() => {
          navigate("/login-register");
          window.location.reload();
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Email Đã Tồn Tại",
            text: "Vui lòng sử dụng email khác.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: `Có lỗi xảy ra. Vui lòng thử lại.`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi Mạng",
          text: "Vui lòng kiểm tra kết nối của bạn và thử lại.",
        });
      }
    }
  };

  return (
    <div className="col-lg-6">
      <div className="login-register-wrap">
        <div className="login-register-title">
          <h1>Đăng kí</h1>
        </div>
        <div className="login-register-form">
          <form onSubmit={handleSubmit}>
            <div className="login-register-input-style input-style">
              <label>Tên hiển thị *</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập Username"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div className="login-register-input-style input-style">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div className="login-register-input-style input-style">
              <label>Mật khẩu *</label>
              <input
                type="password"
                name="password"
                placeholder="Nhập Mật Khẩu"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>
            <div className="login-register-input-style input-style">
              <label>Nhập lại mật khẩu *</label>
              <input
                type="password"
                name="password2"
                placeholder="Nhập Lại Mật Khẩu"
                className="form-control"
                onChange={(e) => setPassword2(e.target.value)}
              />
              {errors.password2 && <p style={{ color: "red" }}>{errors.password2}</p>}
            </div>

            <div id="recaptcha-container" style={{ marginBottom: "15px" }}></div>
            <div className="privacy-policy-wrap">
              <p>
                Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của
                bạn trên toàn bộ trang web này, để quản lý quyền truy cập vào tài
                khoản của bạn và cho các mục đích khác được mô tả trong chính sách
                bảo mật của chúng tôi.

              </p>
            </div>
            <div className="login-register-btn">
              <button type="submit">Đăng kí</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
