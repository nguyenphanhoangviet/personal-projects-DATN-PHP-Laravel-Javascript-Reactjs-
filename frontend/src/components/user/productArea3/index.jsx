import React, { useEffect, useState } from "react";
import ProductArena3 from "./productArea3";
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
    <div className="product-area pb-70 productArea3">
      <div className="custom-container">
        <div className="section-title-btn-wrap mb-35">
          <div className="section-title-1">

            <h2>Gợi ý hôm nay</h2>

          </div>
        </div>
          <div class="d-flex align-items-center mb-5">
            <button class="btn btn-outline-secondary me-2">Sản phẩm mới</button>
            <button class="btn btn-outline-primary me-2">Thuốc thông thường cảm sốt </button>
            <button class="btn btn-outline-secondary me-2">Chăm sóc sức khỏe </button>
            <button class="btn btn-outline-secondary me-2">thiết bị y tế</button>
            <button class="btn btn-outline-secondary me-2">Chăm sóc sắc đẹp</button>
            <button class="btn btn-outline-secondary me-2">Sửa cho cả nhà</button>
            <button class="btn btn-outline-secondary me-2">Vitamin tổng hợp</button>
        </div>
        <div ref={productArena1} className="product-slider-active-1 nav-style-2 nav-style-2-modify-2 d-flex">
          {/* Render 5 sản phẩm yêu thích đầu tiên */}
          {favoriteProducts.slice(0, 5).map((product) => (
            <ProductArena3 key={product.id} product={product} />
          ))}
        </div>

        <div class="row mt-5 g-4 productArea3-banner">
            <div class="col-md-6">
                <div class="banner bg-primary text-white text-center rounded">
                    <div>
                        <img src="https://cdn.nhathuoclongchau.com.vn/unsafe/1280x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1920x565_1_a50e0dee4c.png" alt="" />
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="banner bg-info text-white text-center rounded">
                    <div>
                      <img src="https://cdn.nhathuoclongchau.com.vn/unsafe/1280x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1920x565_deb9cb8e87.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
