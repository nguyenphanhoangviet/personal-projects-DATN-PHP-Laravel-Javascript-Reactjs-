import Slider from "../../../components/user/slider";
import ProductArena1 from "../../../components/user/productArea1";
import BannerArena1 from "../../../components/user/bannerArea1";
import CategoriesArena1 from "../../../components/user/categoriesArea1";
import ProductArena2 from "../../../components/user/productArea2";
import BannerArena2 from "../../../components/user/bannerArea2";
import BrandLogoArea from "../../../components/user/brandLogoArea";
import TestimonialArea from "../../../components/user/testimonialArea";
import ContactArea from "../../../components/user/contactArea";
import ProductArena3 from "../../../components/user/productArea3";
import ProductArena4 from "../../../components/user/productArea4";


const Home = () => {
  return (
    <>
      <Slider />
      <ProductArena1 />
      <BannerArena1 />
      <ProductArena3 />
      <CategoriesArena1 />
      <ProductArena2 />
      <BannerArena2 />
      <ProductArena4 />
      <BrandLogoArea />
      <TestimonialArea />
      <ContactArea />
    </>
  );
};

export default Home;
