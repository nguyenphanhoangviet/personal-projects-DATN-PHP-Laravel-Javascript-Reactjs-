import { Link } from "react-router-dom";

export default function FooterCustomerService() {
  return (
    <div className="col-width-22 custom-common-column">
      <div className="footer-widget mb-40">
        <h3 className="footer-title">Về chúng tôi</h3>
        <div className="footer-info-list">
          <ul>
            <li>
              <Link to="/about"> Giới thiệu</Link>
            </li>
            <li>
              <Link to="/shop"> Sản phẩm </Link>
            </li>
            <li>
              <Link to="/blog"> Bài viết </Link>
            </li>
            {/* <li>
              <Link to="return-policy.html"> Chính Sách Đổi Trả </Link>
            </li> */}
            <li>
              <Link to="#"> Câu Hỏi Thường Gặp Về Mua Sắm </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
