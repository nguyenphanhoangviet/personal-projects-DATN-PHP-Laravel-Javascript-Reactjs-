
import React from "react";
import useSlick from "../../../hooks/user/slick";

export default function ProductDetail_Left({ product }) {
  const { proDecBigImgSlider } = useSlick();
  const { proDecSmallImgSlider } = useSlick();
  
  return (
    <div className="col-lg-6 col-md-6">
      <div className="product-details-slider-wrap">
        <div className="pro-dec-big-img-slider" ref={proDecBigImgSlider}>
          <div className="single-big-img-style">
            <div className="pro-details-big-img">
              <a className="img-popup" >
                <img src={product.image} alt={product.name} />
              </a>
            </div>
            <div className="pro-details-badges product-badges-position">
              <span className="red">Giảm giá!</span>
            </div>
          </div>
          {/* Nếu có nhiều ảnh sản phẩm, có thể lặp qua đây */}
        </div>
        <div className="product-dec-slider-small product-dec-small-style1" ref={proDecSmallImgSlider}>
          <div className="product-dec-small active">
            <img src={product.image} alt="Sản phẩm nhỏ" />
          </div>
          {/* Thêm các ảnh nhỏ khác nếu có */}
        </div>
      </div>
    </div>
  );
}

