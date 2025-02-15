import React, { useEffect, useState } from "react";
import ProductArena2 from "./productArea2";
import useSlick from "../../../hooks/user/slick";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import './style.scss';

export default function Index() {
  const { productArena1 } = useSlick(); // Lấy các ref từ hook
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    // Hàm gọi API để lấy sản phẩm yêu thích
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get("/favorite_products");

        setFavoriteProducts(response.data.favorite_products);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavoriteProducts();
  }, []);

  return (
    <div className="product-area pb-70">
      <div className="custom-container">
        <div className="section-title-btn-wrap mb-35">
          <div className="section-title-1">

            <h2>Sản phẩm yêu thích</h2>

          </div>
          <div className="btn-style-2">
            <a href="#">
            Xem tất cả sản phẩm <i className="far fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div ref={productArena1} className="product-slider-active-1 nav-style-2 nav-style-2-modify-2 d-flex">
          {/* Render 5 sản phẩm yêu thích đầu tiên */}
          {favoriteProducts.slice(0, 5).map((product) => (
            <ProductArena2 key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
