import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import ProductArena1 from './ProductArea1';
import useSlick from '../../../hooks/user/slick';
import axios from 'axios';
import Style from './style.scss';

export default function Index() {
  const { productArena1 } = useSlick(); // Lấy các ref từ hook

  // Xác định thời gian đếm ngược
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // Ngày mai 12:00 AM
    0, 0, 0, 0
  ).getTime();

  // State để lưu trữ sản phẩm mới
  const [newProducts, setNewProducts] = useState([]);

  // Hàm để lấy sản phẩm mới từ API
  const fetchNewProducts = async () => {
    try {
      const response = await axios.get('/new_products');

      console.log(response.data); // In ra để kiểm tra dữ liệu
      setNewProducts(response.data.new_products || []); // Đảm bảo new_products là một mảng
    } catch (error) {
      console.error('Error fetching new products:', error);
    }
  };

  // Gọi hàm fetchNewProducts khi component được mount
  useEffect(() => {
    fetchNewProducts();
  }, []);
  

  return (
    <div className="product-area pt-80 pb-75 productArea1">
      <div className="custom-container">
        <div className="product-area-border">
          <div className="section-title-timer-wrap">
            <div className="section-title-1">

              <h2>Săn Deal giảm sốc</h2>

            </div>
            <div id="timer-1-active" className="timer-style-1">
              <span>Kết thúc:</span>
              <Countdown
                date={midnight}
                renderer={({ hours, minutes, seconds, completed }) => {
                  if (completed) {
                    return <span>It's midnight!</span>;
                  } else {
                    return (
                      <span>
                        {String(hours).padStart(2, '0')}:
                        {String(minutes).padStart(2, '0')}:
                        {String(seconds).padStart(2, '0')}
                      </span>
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className="product-slider-active-1 nav-style-2 product-hm1-mrg d-flex" ref={productArena1}>
            {newProducts.slice(0, 5).map((product) => (
              <ProductArena1 key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
