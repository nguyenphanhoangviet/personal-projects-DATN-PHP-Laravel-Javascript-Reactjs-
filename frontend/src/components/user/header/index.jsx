import HeaderTopHeaderInfo from "./HeaderTopHeaderInfo";
import HeaderTopCovidUpdate from "./HeaderTopCovidUpdate";
import HeaderTopHeaderInfoRight from "./HeaderTopInfoRight";
import HeaderBottomLogo from "./HeaderBottomLogo";
import HeaderBottomMenu from "./HeaderBottomMenu";
import HeaderBottomAction from "./HeaderBottomAction";
import Style from "./header.scss";

const Header = () => {
  return (
    <header className="header-area header-height-1">
      <div className="header-top header-top-ptb-1 bg-gray d-none d-lg-block" >
        <div className="custom-container">
          <div className="row align-items-center">
            <HeaderTopHeaderInfo />
            <HeaderTopCovidUpdate />
            <HeaderTopHeaderInfoRight />
          </div>
        </div>
      </div>
      <div className="header-bottom sticky-bar sticky-white-bg">
        <div className="custom-container">
          <div className="header-wrap header-space-between position-relative">
            <HeaderBottomLogo />
            <HeaderBottomMenu />
            <HeaderBottomAction />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;