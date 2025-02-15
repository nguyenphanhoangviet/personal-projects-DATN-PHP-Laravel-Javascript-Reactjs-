
import { Link } from "react-router-dom";
import TeamArea from "./teamArea";

export default function Index() {
  return (
    <div className="team-area pt-65 pb-25">
      <div className="container">
        <div className="section-title-2 mb-45 wow tmFadeInUp">
          <h2>Gặp gỡ các chuyên gia của chúng tôi</h2>
          <p>
            Khi sứ mệnh của bạn là trở nên tốt hơn, nhanh hơn và thông minh hơn,
            bạn cần những người giỏi nhất để đưa tầm nhìn của bạn tiến xa hơn.
          </p>
        </div>
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <TeamArea key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

