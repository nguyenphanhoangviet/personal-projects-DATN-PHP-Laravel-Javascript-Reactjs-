import React, { forwardRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Product_Related() {
  const { id, slug } = useParams();
  const [related_products, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/product_detail/${slug}/${id}`);
        const data = response.data;
        setProduct(data.related_products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!related_products) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }
  return (
    <div className="product-area pb-70 product_related">
      <div className="custom-container">
        <div className="section-title-btn-wrap mb-35">
          <div className="btn-style-2">Sản phẩm liên quan</div>
          <div className="btn-style-2">
            <a href="#">
              Xem tất cả sản phẩm <i className="far fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="product-slider-active-1 nav-style-2 nav-style-2-modify-2 d-flex">
          {related_products.slice(0, 5).map((product) => (
            <div className="product-plr-1" key={product.id}>
              <div className="single-product-wrap">
                <div className="product-img-action-wrap">
                  <div className="product-img product-img-zoom">
                    <Link to={`/product-detail/${product.slug}/${product.id}`}>
                      <img
                        className="default-img"
                        src={
                          product.image || "assets/images/product/default.png"
                        } // Sử dụng ảnh từ sản phẩm
                        alt={product.name} // Tên sản phẩm
                      />
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
                </div>
                <div className="product-content-wrap">
                  <h2>
                    <Link to={`/product-detail/${product.slug}/${product.id}`}>
                      {product.name}
                    </Link>{" "}
                    {/* Tên sản phẩm */}
                  </h2>
                  <div className="product-price">
                    <span className="new-price">
                      {Number(product.price).toLocaleString()}đ
                    </span>{" "}
                    {/* Giá sản phẩm */}
                    {/* Nếu có giá cũ, hiển thị tại đây */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
