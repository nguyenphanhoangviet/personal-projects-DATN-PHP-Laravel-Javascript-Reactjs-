import AboutUsArea from "../../../components/user/aboutUsArea";
import MisionArea from "../../../components/user/misionArea";
import FunfactArea from "../../../components/user/funfactArea";
import TestimonialArea from "../../../components/user/testimonialArea";
import BrandLogoArea from "../../../components/user/brandLogoArea";
import ContactUsArea from "../../../components/user/contactUsArea";
import TeamArea from "../../../components/user/teamArea";
import style from './style.scss';

const About = () => {
  return (
    <>
        <AboutUsArea />
        <MisionArea />
        <FunfactArea />
        <TestimonialArea />
        {/* <ContactUsArea /> */}
        <TeamArea />
        <BrandLogoArea />
    </>
  );
};

export default About;
