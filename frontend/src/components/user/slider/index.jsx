import React, { useEffect, useState, useRef } from 'react';
import SliderArena from "./SliderArea";
import axios from 'axios';
import Slider from 'react-slick'; 
import { Link } from 'react-router-dom';

const SliderComponent = () => {
  const [sliderImg, setSliderImg] = useState([]);
  const sliderRef = useRef(null); // Tạo ref để quản lý slider

  const fetchSliderImg = async () => {
    try {
      const response = await axios.get('/banners/size/1');
      setSliderImg(response.data || []); // Cập nhật sliderImg từ API
    } catch (error) {
      console.error('Error fetching slider images:', error);
    }
  };

  useEffect(() => {
    fetchSliderImg();
  }, []);

  // Cấu hình cho Slick Slider
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-banner-area padding-10-row-col">
      <div className="custom-container">
        <div className="row">
          <div className="custom-common-column custom-column-width-100 custom-padding-5">
            <div className="slider-area">
              <Slider ref={sliderRef} {...slickSettings} className="hero-slider-active-1 nav-style-1 nav-style-1-position-1">
                {sliderImg.slice(0, 3).map((item) => (
                  <SliderArena key={item.id} item={item} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
