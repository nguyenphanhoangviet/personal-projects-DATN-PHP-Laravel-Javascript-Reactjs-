import React, { useEffect, useState } from "react";
import ProductArena4 from "./productArea4";
import useSlick from "../../../hooks/user/slick";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios
import "./style.scss";

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
    <div className="product-area pb-70 productArea4">
      <div className="custom-container">
        <div className="section-title-btn-wrap mb-35">
          <div className="section-title-1">
            <h2>Sản phẩm theo đối tượng</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div className="sidebar-list">
              <div className="sidebar-categories">
                <li>
                  <a className="active" style={{ cursor: "pointer" }}>
                    Nam giới
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Phụ nữ
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Trẻ em
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Mẹ và bé
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Người cao tuổi
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Người mang thai
                  </a>
                </li>
                <li>
                  <a className="" style={{ cursor: "pointer" }}>
                    Người tiểu đường
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div class="col-9">
            <div
              ref={productArena1}
              className="product-slider-active-1 nav-style-2 nav-style-2-modify-2 d-flex"
            >
              {/* Render 5 sản phẩm yêu thích đầu tiên */}
              {favoriteProducts.slice(0, 4).map((product) => (
                <ProductArena4 key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
