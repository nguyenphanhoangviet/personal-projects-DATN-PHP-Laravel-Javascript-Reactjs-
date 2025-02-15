export default function SearchPopup() {
    return (
        <div className="search-popup-wrap main-search-active">
            <div className="mobile-menu-close close-style-wrap">
                <button className="close-style search-close">
                    <i className="icon-top"></i>
                    <i className="icon-bottom"></i>
                </button>
            </div>
            <div className="search-popup-content">
                <form className="search-popup-form" action="#">
                    <input type="text" placeholder="Tìm kiếm…" />
                </form>
            </div>
        </div>
    );
}

;