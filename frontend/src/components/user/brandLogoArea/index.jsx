import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BrandLogoArea from "./BrandLogoArea"; // Đảm bảo bạn đang import đúng component
import useSlick from "../../../hooks/user/slick";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios

export default function Index() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';

  const { BrandLogoSettings } = useSlick();
  const [brands, setBrands] = useState([]); // State để lưu trữ danh sách thương hiệu

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/all_brands"); // Thay đổi từ fetch sang axios
        console.log(response.data); // Kiểm tra dữ liệu
        setBrands(response.data.brands); // Giả sử response.data.brands chứa danh sách thương hiệu
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="brand-logo-area pb-35">
      <div className="custom-container">
        {!isAboutPage && isHomePage && (
          <div className="section-title-1 wow tmFadeInUp mb-30">
            <h2>Mua sắm theo thương hiệu</h2>
          </div>
        )}
        <div ref={BrandLogoSettings} className="row align-items-center wow tmFadeInUp">
          {/* Truyền toàn bộ danh sách brands vào BrandLogoArea */}
          <BrandLogoArea brands={brands} />
        </div>
      </div>
    </div>
  );
}
