import React , { useEffect, useState }  from "react";
import BannerArenaLeft from "./BannerAreaLeft";
import BannerArenaRight from "./BannerAreaRight";
import axios from "axios";

export default function Index() {
  const [bannerImg2Left, setBannerImg2left] = useState([]);
  const [bannerImg2Right, setBannerImg2Right] = useState([]);

  const fetchBannerImg2Left = async () => {
    try {
      const response = await axios.get('/banners/size/1');
      setBannerImg2left(response.data || []);
    } catch (error) {
      console.error('Error fetching slider images:', error);
    }
  };

  const fetchBannerImg2Right = async () => {
    try {
      const response = await axios.get('/banners/size/4');
      setBannerImg2Right(response.data || []);
    } catch (error) {
      console.error('Error fetching slider images:', error);
    }
  }

  useEffect(() => {
    fetchBannerImg2Left();
    fetchBannerImg2Right();
  }, []);

  return (
    <div className="banner-area pb-45">
        <div className="custom-container">
          <div className="row">
          {bannerImg2Left.slice(0, 1).map((item) => (
            <BannerArenaLeft key={item.id} item={item} />
          ))}
          {bannerImg2Right.slice(0, 1).map((item) => (
            <BannerArenaRight key={item.id} item={item} />
          ))}
          </div>
        </div>
      </div>
  );
}
