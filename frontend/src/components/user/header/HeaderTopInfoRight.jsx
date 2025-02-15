import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function HeaderTopHeaderInfoRight() {
  const isLoggin = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
          setName(storedName);
        }
      }, []);

  const handleLogout = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      Swal.fire({
        title: 'Đăng xuất thành công!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/'); 
      });
    } catch (error) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  return (
    <div className="col-xl-3 col-lg-4">
      <div className="header-info header-info-right">
        <ul>
          <li>
            <a className="language-dropdown-active" href="#">
            Tiếng Việt <i className="fa fa-chevron-down"></i>
            </a>
            <ul className="language-dropdown">
              <li>
                <a href="#">Tiếng Anh</a>
              </li>
            </ul>
          </li>
          {isLoggin ? (
          
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <div className="name_user">
                {name ? name : 'Chưa có tên người dùng'}    
                </div>
                <div className="avatar avatar-online">
                  <img
                    src="/assets/images/avatars/1.png"
                    alt="Hình đại diện người dùng"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
                <ul className="language-dropdown">
                  <li className="nav-item lh-1 me-4 hihi">
                    <Link
                      className="github-button"
                      to="/user-profile"
                      data-icon="octicon-star"
                      data-size="large"
                      data-show-count="true"
                      aria-label="Star themeselection/sneat-html-admin-template-free trên GitHub"
                    >
                      Quản lý tài khoản
                    </Link>
                  </li>
                  <li className="nav-item lh-1 me-4 hihi">
                    <Link
                      className="github-button"
                      to="/#"
                      onClick={handleLogout} 
                      data-icon="octicon-star"
                      data-size="large"
                      data-show-count="true"
                      aria-label="Star themeselection/sneat-html-admin-template-free trên GitHub"
                    >
                      Thoát
                    </Link>
                  </li>
                </ul>
                  </li>
              
               ) : (
              
            <li className="nav-item lh-1 me-4 hihi">
            <Link
              className="github-button"
              to="/login-register"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star themeselection/sneat-html-admin-template-free trên GitHub"
            >
              Đăng ký / Đăng nhập
            </Link>
          </li>
            )}
        </ul>
        
      </div>
    </div>
  );
}
