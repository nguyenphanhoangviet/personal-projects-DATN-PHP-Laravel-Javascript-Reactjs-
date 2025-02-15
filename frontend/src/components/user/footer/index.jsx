import FooterAbout from "./FooterAbout";
import FooterCustomerService from "./FooterCustomerService";
import FooterOurCompany from "./FooterOurCompany";
import FooterDownloadOurApp from "./FooterDownloadOurApp";
import './style.scss';

const Footer = () => {
  return (
    <footer className="footer-area pt-75 pb-35">
      <div className="custom-container">
        <div className="row">
          <FooterAbout />
          <FooterCustomerService />
          <FooterOurCompany />
          <FooterDownloadOurApp />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
