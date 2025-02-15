import React , { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import BannerArena1 from "./BannerArea1";
import axios from 'axios';
import Style from './Style.scss';

export default function Index() {
  const [bannerImg1, setBannerImg1] = useState([]);

  const fetchBannerImg1 = async () => {
    try {
      const response = await axios.get('/banners/size/4');
      setBannerImg1(response.data || []); 
    } catch (error) {
      console.error('Error fetching slider images:', error);
    }
  };

  useEffect(() => {
    fetchBannerImg1();
  }, []);
  
  return (
    <div className="banner-area pb-40">
      <div className="custom-container">
        <div className="row">
          {bannerImg1.slice(0, 3).map((item) => (
            <BannerArena1 key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
