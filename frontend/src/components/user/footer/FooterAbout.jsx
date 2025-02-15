import { Link } from "react-router-dom";

export default function FooterAbout() {
  return (
    <div className="col-width-25 custom-common-column">
      <div className="footer-widget footer-about mb-30">
        <div className="footer-logo logo-width-1">
          <a href="index.html">
            <img src="/assets/images/logo/logoo.png" alt="logo" />
          </a>
        </div>
        <div className="copyright">
          <p>
            <a target="_blank" href="https://hasthemes.com/">
              Được xây dựng bởi nhóm <span>CF5D</span>
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
