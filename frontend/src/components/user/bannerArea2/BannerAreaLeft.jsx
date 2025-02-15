import React from "react";
import './style.scss';

export default function BannerArenaLeft({ item }) {
  return (
    <div className="col-lg-8">
      <div className="banner-wrap wow tmFadeInUp mb-30 bg-img">
        <div className="banner-img banner-img-zoom">
          <a href="product-details.html">
            <img src={item.image_path} alt=""/>
          </a>
        </div>
      </div>
    </div>
  );
}
