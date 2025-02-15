import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div className="col-xl-3 col-lg-4 col-md-4 col-12 col-sm-6 wow tmFadeInUp">
      <div className="single-product-wrap mb-50">
        <div className="product-img-action-wrap mb-10">
          <div className="product-img product-img-zoom">
           
            <Link to={`/product-detail/${product.slug}/${product.id}`}>
              <img
                className="default-img"
                src={product.image || "assets/images/product/default.png"} // Sử dụng ảnh từ sản phẩm
                alt={product.name} // Tên sản phẩm
              />
               <img className="hover-img" src={product.image} alt={product.name} />
            </Link>
           
            
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
          <div className="product-badges product-badges-position product-badges-mrg">
            <span className="red-2">Sold out</span>
          </div>
        </div>
        <div className="product-content-wrap">
          <h2>
          <Link to={`/product-detail/${product.slug}/${product.id}`}>{product.name}</Link> {/* Tên sản phẩm */}
          </h2>
          <div className="product-price">
          <span className="new-price">{Number(product.price).toLocaleString()}đ</span> {/* Giá sản phẩm */}
            {/* <span className="old-price">500.400đ</span> */}
            <span className="old-price">{Number(product.price * 1.1).toLocaleString()} đ</span> {/* Giá sản phẩm */}

          </div>
        </div>
      </div>
    </div>
  );
}
