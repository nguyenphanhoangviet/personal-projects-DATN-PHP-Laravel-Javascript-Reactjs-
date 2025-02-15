import { Link } from "react-router-dom";

export default function HeaderTopHeaderInfo() {
  return (
    <div className="col-xl-3 col-lg-4">
      <div className="header-info">
        <ul>
          <li>
            <Link to="tel:0394444686">(+84) 394 444 686</Link>
          </li>
          <li>
            <Link target="_blank" to="https://maps.app.goo.gl/nbBtL3mQ56jH5g1y5">
              Vị trí cửa hàng
            </Link>

          </li>
        </ul>
      </div>
    </div>
  );
}
