  import React, { useState } from "react";
  import axios from "axios";
  import Swal from "sweetalert2";
  import { Link, useNavigate } from "react-router-dom";

  export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState(""); 
    const [errorMessage, setErrorMessage] = useState('');
    const [serverError, setServerError] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;
      // Reset error messages
      setEmailError("");
      setPasswordError("");
      setServerError("");

      // Kiểm tra nếu email hoặc mật khẩu không đủ ký tự
      if (email.length < 5 || !emailRegex.test(email)) {
        setEmailError("Email không hợp lệ.");
        return;
      }

      if (password.length < 6) {
        setPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
        return;
      }

      if (!isValid) return;

      try {
        const response = await axios.post(
          "/auth/login",
          {
            email,
            password,
          }
        );


        // Kiểm tra nếu phản hồi và dữ liệu tồn tại
        if (response && response.data) {
          // Lưu token vào localStorage

          localStorage.setItem("token", response.data.access_token);

          // Điều hướng đến bảng điều khiển
          navigate("/");

          Swal.fire({
            icon: "success",
            title: "Đăng Nhập Thành Công",
            text: "Bạn sẽ được chuyển hướng đến bảng điều khiển.",
          }).then(() => {
            // Điều hướng đến bảng điều khiển
            navigate("/");
            
            // Làm mới trang sau khi người dùng nhấn OK
            window.location.reload();
          });;
        }
        
        const user = await axios.get('/auth/your_profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        localStorage.setItem('user_name', user.data.name)
        localStorage.setItem('user_id', user.data.id)
        
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage("Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.");
          } else {
            setErrorMessage(`Lỗi: ${error.response.status}. Vui lòng thử lại sau.`);
          }
        } else {
          setErrorMessage("Vui lòng kiểm tra kết nối của bạn và thử lại.");
        }
      }
    };

    // Handle the Forgot Password logic
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate the email
    if (!emailRegex.test(email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }

    try {
      const response = await axios.post("/forgot-password", { email });

      // Show success message if the email was sent
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Email đã được gửi!",
          text: "Hãy kiểm tra email của bạn để đặt lại mật khẩu.",
        }).then(() => {
          setForgotPassword(false); // Close the Forgot Password form
        });
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Không thể gửi email reset mật khẩu. Vui lòng thử lại sau.");
      } else {
        setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

    const handleGoogleLogin = async () => {
      const backendUrl = axios.defaults.baseURL
      
      const googleLoginUrl = `${backendUrl}/login-customer-google`;
  
      try {
        window.location.href = googleLoginUrl;
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    };
    const imagePath = process.env.PUBLIC_URL + "/images/bg-image.webp";
  <section
        className="vh-100 bg-image"
        style={{ backgroundImage: `url('${imagePath}')` }}
      >
    </section>
    return (
    
      <div className="col-lg-6">
      <div className="login-register-wrap login-register-gray-bg">
        <div className="login-register-title">
          <h1>{forgotPassword ? "Quên Mật Khẩu" : "Đăng Nhập"}</h1>
        </div>
        <div className="login-register-form">
          {forgotPassword ? (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword}>
              <div className="login-register-input-style input-style input-style-white">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập Email của bạn"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              <div className="login-register-btn">
                <button type="submit">Gửi Lại Mật Khẩu</button>
              </div>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setForgotPassword(false)}
                >
                  Quay lại đăng nhập
                </button>
              </div>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleSubmit}>
              <div className="login-register-input-style input-style input-style-white">
                <label>Nhập Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              </div>
              <div className="login-register-input-style input-style input-style-white">
                <label>Mật khẩu *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nhập Mật Khẩu"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
              </div>
              <div className="lost-remember-wrap">
                <div className="remember-wrap">
                  <input type="checkbox" />
                  <span>Lưu mật khẩu</span>
                </div>
                <div className="lost-wrap">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setForgotPassword(true)}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </div>

              <div className="login-register-btn">
                <button type="submit">Đăng nhập</button>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
              </div>
            </form>
          )}
          <div id="dngooggle" className="text-center mt-5">
            <Link onClick={handleGoogleLogin} style={{ background: "none", border: "none", padding: 0 }}>
              <img width="300" src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt="Sign in with Google" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // export default YourComponent;
          


    