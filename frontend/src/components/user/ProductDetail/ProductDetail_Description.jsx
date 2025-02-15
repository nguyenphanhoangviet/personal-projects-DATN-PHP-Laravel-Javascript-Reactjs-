import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail_Description() {
  const { id, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('navs-top-home');
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/product_detail/${slug}/${id}`);
        const data = response.data;
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Nếu chưa có sản phẩm, có thể hiển thị thông báo đang tải
  if (!product) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

  
  
  return (
    <div className="nav-align-top nav-tabs-shadow mb-6">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'navs-top-home' ? 'active' : ''}`}
            role="tab"
            onClick={() => handleTabClick('navs-top-home')}
            aria-controls="navs-top-home"
            aria-selected={activeTab === 'navs-top-home'}
          >
            Home
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'navs-top-profile' ? 'active' : ''}`}
            role="tab"
            onClick={() => handleTabClick('navs-top-profile')}
            aria-controls="navs-top-profile"
            aria-selected={activeTab === 'navs-top-profile'}
          >
            Profile
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'navs-top-messages' ? 'active' : ''}`}
            role="tab"
            onClick={() => handleTabClick('navs-top-messages')}
            aria-controls="navs-top-messages"
            aria-selected={activeTab === 'navs-top-messages'}
          >
            Messages
          </button>
        </li>
      </ul>
      <div className="tab-content">
        <div className={`tab-pane fade ${activeTab === 'navs-top-home' ? 'show active' : ''}`} id="navs-top-home" role="tabpanel">
          <p>{product.description}</p>
        </div>
        <div className={`tab-pane fade ${activeTab === 'navs-top-profile' ? 'show active' : ''}`} id="navs-top-profile" role="tabpanel">
          <p>{product.uses}</p>
        </div>
        <div className={`tab-pane fade ${activeTab === 'navs-top-messages' ? 'show active' : ''}`} id="navs-top-messages" role="tabpanel">
          <p>{product.user_manual}</p>
        </div>
      </div>
    </div>
  );
}
