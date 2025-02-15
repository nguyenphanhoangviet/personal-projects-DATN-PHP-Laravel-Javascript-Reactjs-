import { Link } from "react-router-dom";

export default function FooterOurCompany() {
  return (
    <div className="col-width-22 custom-common-column">
      <div className="footer-widget mb-40">
        <h3 className="footer-title">Thông tin liên hệ</h3>
        <div className="footer-info-list">
          <ul>
            <li>
              <Link to="tel:0394444686"> SĐT: <b>(+84) 394 444 686</b></Link>
            </li>
            <li>
              <Link to="tel:18001102"> Đường dây nóng: <b>1800 - 1102</b> </Link>
            </li>
            <li>
              <Link to="#"> Email: <b>contact.yentam@gmail.com</b></Link>
            </li>
            <li>
              <Link to="https://maps.app.goo.gl/T3vNXduQUAQTYL1T9"> Địa chỉ: <b>Công Viên Phần Mềm Quang Trung</b></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
