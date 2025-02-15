import React from "react";

export default function BannerArenaRight({item}) {
  return (
    <div className="col-lg-4">
      <div className="banner-wrap wow tmFadeInUp mb-30">
        <div className="banner-img banner-img-zoom">
          <a href="product-details.html">
            <img src={item.image_path} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
