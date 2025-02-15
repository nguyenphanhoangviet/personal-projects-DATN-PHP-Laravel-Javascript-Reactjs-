import { Link } from "react-router-dom";

export default function FooterDownloadOurApp() {
  return (
    <div className="col-width-31 custom-common-column">
      <div className="footer-widget mb-40">
        <h3 className="footer-title">Cổng Thanh Toán An Toàn</h3>
        <div className="app-visa-wrap">
          {/* <p>Truy Cập Nhanh & Tiện Lợi</p>
          <div className="app-google-img">
            <a href="#">
              <img src="assets/images/icon-img/app-store.jpg" alt="" />
            </a>
            <a href="#">
              <img src="assets/images/icon-img/google-play.jpg" alt="" />
            </a>
          </div> */}
          {/* <p>Cổng Thanh Toán An Toàn</p> */}
          <div className="payment-img">
            <a href="#">
              <img src="assets/images/icon-img/payment-method.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
