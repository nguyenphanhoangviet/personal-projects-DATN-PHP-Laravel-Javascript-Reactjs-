
import React from "react";

export default function ProductDetail_Review() {
  return (
    <div className="pro-details-review-wrap">
      <div className="entry-product-section-heading">
        <h2> Đánh giá (2)</h2>
      </div>
      <div className="pro-details-review">
        <p>
          <span>5.00</span> trung bình dựa trên 2 đánh giá.
        </p>
        <div className="single-pro-details-review">
          <div className="review-img">
            <img src="assets/images/client/client-1.jpg" alt="" />
          </div>
          <div className="review-content">
            <div className="review-name-rating">
              <div className="review-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="review-name">
                <h6>Edna Watson</h6>
              </div>
            </div>
            <p>Giao hàng rất nhanh và tốt trong tuần. Cảm ơn bạn!</p>
            <div className="review-date-btn">
              <div className="review-date">
                <span> 16 tháng 4, 2020 lúc 3:08 sáng </span>
              </div>
              <div className="review-btn">
                <a href="#">Phản hồi</a>
              </div>
            </div>
          </div>
        </div>
        <div className="single-pro-details-review">
          <div className="review-img">
            <img src="assets/images/client/client-2.jpg" alt="" />
          </div>
          <div className="review-content">
            <div className="review-name-rating">
              <div className="review-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="review-name">
                <h6>Edna Watson</h6>
              </div>
            </div>
            <p>Giao hàng rất nhanh và tốt trong tuần. Cảm ơn bạn!</p>
            <div className="review-date-btn">
              <div className="review-date">
                <span> 16 tháng 4, 2020 lúc 3:08 sáng </span>
              </div>
              <div className="review-btn">
                <a href="#">Phản hồi</a>
              </div>
            </div>
          </div>
        </div>
        <div className="ratting-form-wrapper">
          <h3>Thêm một đánh giá </h3>
          <p>
            Địa chỉ email của bạn sẽ không được công khai. Các trường bắt buộc
            được đánh dấu{" "}
          </p>
          <div className="comment-form-rating-wrap">
            <span>Đánh giá của bạn: *</span>
            <div className="comment-form-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
          <div className="rating-form-style">
            <form action="#">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <input type="text" placeholder="Tên *" />
                </div>
                <div className="col-lg-6 col-md-6">
                  <input type="email" placeholder="Email *" />
                </div>
                <div className="col-lg-12 col-md-12">
                  <textarea placeholder="Đánh giá của bạn"></textarea>
                </div>
              </div>
              <div className="cookies-consent">
                <input type="checkbox" value="yes" />
                <p>
                  Lưu tên, email và trang web của tôi trong trình duyệt này cho
                  lần bình luận tiếp theo.
                </p>
              </div>
              <div className="form-submit">
                <input type="submit" value="Gửi" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

