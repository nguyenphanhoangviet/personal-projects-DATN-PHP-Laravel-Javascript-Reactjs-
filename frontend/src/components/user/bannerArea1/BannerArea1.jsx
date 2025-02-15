import React from 'react';
import { Link } from 'react-router-dom';

export default function BannerArena1({ item }) {  

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="banner-wrap wow tmFadeInUp mb-30">
        <div className="banner-img banner-img-zoom">
          <Link to="/shop">
            <img src={item.image_path} alt="Banner" />
          </Link>
        </div>
      </div>
    </div>
  );
}
