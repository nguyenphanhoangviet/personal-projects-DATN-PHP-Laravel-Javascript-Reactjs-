
import React from "react";
import ProductDetail from "./ProductDetail";
import Information from "./Information";
import Product_Related from "./Product_Related";
import './Style.scss';

export default function Index() {
  return (
    <div className="product-details-area padding-30-row-col pt-75 pb-75">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="product-details-wrap">
              <ProductDetail />
              <Information />
              <Product_Related />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

