import { Link } from "react-router-dom";

export default function HeaderBottomLogo() {
  return (
    <div className="logo logo-width-1">
      <Link to="/">

        <img src="/assets/images/logo/logoo.png" alt="logo" />

      </Link>
    </div>
  );
}
