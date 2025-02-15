// ContactButtons.js
import React, { useState, useEffect } from 'react';
import "./ContactButtons.scss"; // Import the CSS file for styling

const ContactButtons = () => {
    const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra khi người dùng cuộn trang
  const checkScrollTop = () => {
    if (!isVisible && window.pageYOffset > 300) {
      setIsVisible(true); // Hiển thị nút khi cuộn xuống 300px
    } else if (isVisible && window.pageYOffset <= 300) {
      setIsVisible(false); // Ẩn nút khi cuộn lên trên 300px
    }
  };

  // Gắn sự kiện cuộn trang
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [isVisible]);

  // Hàm để cuộn lên đầu trang khi nút được nhấn
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  return (
    <div id="gom-all-in-one">
      {/* Facebook Fanpage Button */}
      <div id="fanpage-vr" className="button-contact">
        <div className="phone-vr">
          <div className="phone-vr-circle-fill"></div>
          <div className="phone-vr-img-circle">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100013800548570"
              rel="noopener noreferrer"
            >
              <img
                src="https://fodecor.vn/wp-content/plugins/button-contact-vr/img/Facebook.png"
                alt="Fanpage"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Zalo Button */}
      <div id="zalo-vr" className="button-contact">
        <div className="phone-vr">
          <div className="phone-vr-circle-fill"></div>
          <div className="phone-vr-img-circle">
            <a
              target="_blank"
              href="https://zalo.me/0394608628"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
                alt="Zalo"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Phone Button */}
      <div id="phone-vr" className="button-contact">
        <div className="phone-vr">
          <div className="phone-vr-circle-fill"></div>
          <div className="phone-vr-img-circle">
            <a href="tel:01231230123">
              <img
                src="https://fodecor.vn/wp-content/plugins/button-contact-vr/img/phone.png"
                alt="Phone"
              />
            </a>
          </div>
        </div>
      </div>

      <div
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      ↑
    </div>
    </div>
  );
};

export default ContactButtons;
