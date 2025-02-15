import { Link, useLocation } from "react-router-dom";
import './header.scss';

export default function HeaderBottomMenu() {
  const location = useLocation();
  return (
    <div className="main-menu main-menu-padding-1 main-menu-lh-1 d-none d-lg-block hover-boder">
      <nav>
        <ul>
          <li>
            <Link className={location.pathname === '/' ? 'active' : ''} to="/">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link className={location.pathname === '/about' ? 'active' : ''} to="/about">Giới thiệu</Link>
          </li>
          <li>
            <Link className={location.pathname === '/shop' ? 'active' : ''} to="/shop">Sản Phẩm</Link>
          </li>
          <li className="position-static">
            <Link to="#">
              Danh mục <i className="fa fa-chevron-down"></i>
            </Link>
            <ul className="mega-menu">
              <li className="sub-mega-menu sub-mega-menu-width-22">
                <a className="menu-title" href="#">
                  Phụ Kiện Y Tế
                </a>
                <ul className="submenu">
                  <li><Link to="/categories/thuoc">Thuốc</Link></li>
                  <li><Link to="/categories/thuc-pham-chuc-nang">Thực phẩm chức năng</Link></li>
                  <li><Link to="/categories/khau-trang">Khẩu trang</Link></li>
                  <li><Link to="/categories/vat-tu-y-te">Vật tư y tế</Link></li>
                </ul>
              </li>
              <li className="sub-mega-menu sub-mega-menu-width-22">
                <a className="menu-title" href="#">
                  Khẩu trang
                </a>
                <ul>
                  <li>
                    <a href="product-details.html">Khẩu trang phẫu thuật</a>
                  </li>
                  <li>
                    <a href="product-details.html">
                      Tìm kiếm Phòng thí nghiệm N95 Mặt nạ
                    </a>
                  </li>
                  <li>
                    <a href="product-details.html">Khẩu trang N95</a>
                  </li>
                </ul>
              </li>
              <li className="sub-mega-menu sub-mega-menu-width-22">
                <a className="menu-title" href="#">
                  Thiết bị bệnh viện
                </a>
                <ul>
                  <li>
                    <a href="product-details.html">Giường bệnh viện</a>
                  </li>
                  <li>
                    <a href="product-details.html">Ghế vận chuyển nhẹ</a>
                  </li>
                  <li>
                    <a href="product-details.html">Áo sơ mi nam cổ chữ V</a>
                  </li>
                  <li>
                    <a href="product-details.html">
                      Tẩy tế bào chết bỏ túi Essentials
                    </a>
                  </li>
                  <li>
                    <a href="product-details.html">Thiết bị oxy thủ công</a>
                  </li>
                </ul>
              </li>
              <li className="sub-mega-menu sub-mega-menu-width-34">
                <div className="menu-banner-wrap">
                  <a href="product-details.html">
                    <img src="assets/images/banner/menu-banner.jpg" alt="" />
                  </a>
                  <div className="menu-banner-content">
                    <h4>Người dùng</h4>
                    <h3>
                      Nhiệt độ <br /> Súng
                    </h3>
                    <div className="menu-banner-price">
                      <span className="new-price">$35.00</span>
                      <span className="old-price">$45.00</span>
                    </div>
                    <div className="menu-banner-btn">
                      <a href="product-details.html">Mua ngay</a>
                    </div>
                  </div>
                  <div className="menu-banner-discount">
                    <h3>
                      <span>22%</span>
                      off
                    </h3>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <Link className={location.pathname === '/blog' ? 'active' : ''} to="/blog">Bài viết</Link>
          </li>
          <li>
            <Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact">Liên hệ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
