import React from 'react';
import { Link } from 'react-router-dom';

export default function BannerImageTop({ isBottom }) {
  return (
    <div className="col-xl-12 col-lg-6 col-md-6 col-12 col-sm-12">
      <div className="banner-wrap wow tmFadeInUp mb-10">
        <div className="banner-img banner-img-zoom">
          <a href="product-details.html">
            <img src="assets/images/banner/banner-2.jpg" alt="Sanitizer Gel Alcohol" />
          </a>
        </div>
        <div className="banner-content-1">
          <span>Home Medical Supplies</span>
          <h2>Sanitizer Gel Alcohol</h2>
          <h3>$15.00</h3>
          <div className="btn-style-1">
            <a className="font-size-14 btn-1-padding-2" href="product-details.html">
              Shop now{" "}
            </a>
          </div>
        </div>
        {!isBottom && (
          <div className="banner-badge banner-badge-position1">
            <h3>
              <span>Best</span>
              Selling
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
