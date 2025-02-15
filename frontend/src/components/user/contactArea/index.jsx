import { Link } from "react-router-dom";

export default function ContactArea() {
  return (
    <div className="contact-area bg-gray-2">
      <div className="custom-container">
        <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="single-contact-wrap text-center wow tmFadeInUp">
                <h4>Giao hàng siêu tốc</h4>
                <p>Giao tận nhà hoặc nhận tại nhà thuốc</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="single-contact-wrap text-center wow tmFadeInUp">
                <h4>Đủ thuốc chuẩn</h4>
                <p>Thuốc chất lượng, phục vụ tận tình </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="single-contact-wrap text-center wow tmFadeInUp">
                <h4>Miễn phí vận chuyển</h4>
                <p>Miễn phí cho mọi đơn hàng toàn quốc</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="single-contact-wrap text-center wow tmFadeInUp">
                <h4>Nhân viên nhiệt tình</h4>
                <p>Đội ngũ nhân viên tận tâm, nhiệt tình</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
