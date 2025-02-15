
import React from "react";

export default function Index() {
  return (
    <div className="contact-us-area contact-us-bg pt-75 pb-75">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-width-58 custom-common-column">
            <div className="contact-from-area contact-from-area-bg padding-20-row-col wow tmFadeInUp">
              <h3>Hỏi chúng tôi bất cứ điều gì tại đây</h3>
              <form
                className="contact-form-style"
                id="contact-form"
                action="https://rundemo.moveaddons.com/medizin/assets/mail-php/mail.php"
                method="post"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="input-style mb-20">
                      <input name="name" placeholder="Tên" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="input-style mb-20">
                      <input name="email" placeholder="Email" type="email" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-style mb-20">
                      <input name="subject" placeholder="Chủ đề" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="textarea-style mb-30">
                      <textarea
                        name="message"
                        placeholder="Tin nhắn của bạn"
                      ></textarea>
                    </div>
                    <button className="submit" type="submit">
                      Gửi tin nhắn
                    </button>
                  </div>
                </div>
              </form>
              <p className="form-messege"></p>
            </div>
          </div>
          <div className="col-width-41 custom-common-column">
            <div className="contact-info-wrap">
              <div className="single-contact-info2-wrap wow tmFadeInUp">
                <div className="single-contact-info2-icon">
                  <i className="fal fa-phone"></i>
                </div>
                <div className="single-contact-info2-content">
                  <p>Gọi ngay để được hỗ trợ!</p>
                  <h2>
                    {" "}
                    <a href="tel:190068668"> 1900 68668</a>
                  </h2>
                </div>
              </div>
              <div className="single-contact-info2-wrap wow tmFadeInUp">
                <div className="single-contact-info2-icon">
                  <i className="fal fa-envelope"></i>
                </div>
                <div className="single-contact-info2-content">
                  <p>Nói lời chào</p>
                  <h3>
                    <a href="#">info@medizin.com</a>
                  </h3>
                </div>
              </div>
              <div className="single-contact-info2-wrap wow tmFadeInUp">
                <div className="single-contact-info2-icon">
                  <i className="fal fa-map-marked-alt"></i>
                </div>
                <div className="single-contact-info2-content">
                  <p>Địa chỉ</p>
                  <h4>
                    {" "}
                    <a href="https://www.google.com/maps">
                      {" "}
                      62 Gresham St, Victoria Park WA 6100, Australia
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

