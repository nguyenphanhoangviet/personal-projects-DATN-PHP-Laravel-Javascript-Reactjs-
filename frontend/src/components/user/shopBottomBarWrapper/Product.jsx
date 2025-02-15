import React from "react";

const Product = ({ product }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-30">
      <div className="single-product-wrap mb-50">
        <div className="product-img-action-wrap mb-10">
          <div className="product-img product-img-zoom">
            <a href={`/product-detail/${product.slug}/${product.id}`}>
              <img className="default-img" src={product.image} alt={product.name} />
              {/* Optional hover image if needed */}
              <img className="hover-img" src={product.image} alt={product.name} />
            </a>
          </div>
          <div className="product-action-1">
            <button aria-label="Add To Cart">
              <i className="far fa-shopping-bag"></i>
            </button>
            <button aria-label="Add To Wishlist">
              <i className="far fa-heart"></i>
            </button>
            <button aria-label="Compare">
              <i className="far fa-signal"></i>
            </button>
          </div>
          {product.status === 0 && (
            <div className="product-badges product-badges-position product-badges-mrg">
              <span className="red-2">Sold out</span>
            </div>
          )}
        </div>
        <div className="product-content-wrap">
          <h2>
            <a href={`product-details/${product.slug}`}>{product.name}</a>
          </h2>
          <div className="product-price">
            <span className="new-price">{product.price.toLocaleString()}đ</span>
            {/* Optional old price if exists */}
            {/* <span className="old-price">500.400đ</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
