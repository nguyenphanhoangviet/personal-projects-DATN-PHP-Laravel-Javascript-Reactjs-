export default function MobileHeaderMenu() {
    return (
        <div className="mobile-header-active mobile-header-wrapper-style">
        <div className="mobile-header-wrapper-inner">
            <div className="mobile-header-top">
                <div className="mobile-header-logo">
                    <a href='index.html'><img src="assets/images/logo/logo.png" alt="logo" /></a>
                </div>
                <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                    <button className="close-style search-close">
                        <i className="icon-top"></i>
                        <i className="icon-bottom"></i>
                    </button>
                </div>
            </div>
            <div className="mobile-header-content-area">
                <div className="covid-update covid-update-mobile mobile-header-border">
                    <p><a href="#">COVID-19 UPDATE</a> We are open with limited hours and staff.</p>
                </div>
                <div className="mobile-menu-wrap mobile-header-border">
                    <nav>
                        <ul className="mobile-menu">
                            <li className="menu-item-has-children"><a href='index.html'>Home</a>
                                <ul className="dropdown">
                                    <li><a href='index.html'>Home 1 – Medical Supplies</a></li>
                                    <li><a href='index-2.html'>Home 2 – Mega Shop</a></li>
                                    <li><a href='index-3.html'>Home 3 – Medical Equipment</a></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children "><a href='shop.html'>shop</a>
                                <ul className="dropdown">
                                    <li><a href='shop.html'>Shop – Left Sidebar</a></li>
                                    <li><a href='shop-right-sidebar.html'>Shop – Right Sidebar</a></li>
                                    <li><a href='shop-filter.html'>Shop – Filter</a></li>
                                    <li><a href='wishlist.html'>Wishlist</a></li>
                                    <li><a href='cart.html'>Shopping Cart</a></li>
                                    <li><a href='checkout.html'>Checkout</a></li>
                                    <li className="menu-item-has-children"><a href="#">Single Layout</a>
                                        <ul className="dropdown">
                                            <li><a href='product-details.html'>List – Left Sidebar</a></li>
                                            <li><a href='product-details-right-sidebar.html'>List – Right Sidebar</a></li>
                                            <li><a href='product-details-no-sidebar.html'>List – No Sidebar</a></li>
                                            <li><a href='product-details-tab-left-sidebar.html'>Tabs – Left Sidebar</a></li>
                                            <li><a href='product-details-tab-right-sidebar.html'>Tabs – Right Sidebar</a></li>
                                            <li><a href='product-details-tab-no-sidebar.html'>Tabs – No Sidebar</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children"><a href="#">Collection</a>
                                <ul className="dropdown">
                                    <li className="menu-item-has-children"><a href="#">Medical Accessories</a>
                                        <ul className="dropdown">
                                            <li><a href='product-details.html'>Ice Cold Water Therapy</a></li>
                                            <li><a href='product-details.html'>Oxygen Breathing Machine</a></li>
                                            <li><a href='product-details.html'>Stainless Steel Kidney Tray</a></li>
                                            <li><a href='product-details.html'>Stainless Steel Scissors</a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children"><a href="#">Face Mask</a>
                                        <ul className="dropdown">
                                            <li><a href='product-details.html'>Surgical Face Mask</a></li>
                                            <li><a href='product-details.html'>Search Lab N95 Face Mask</a></li>
                                            <li><a href='product-details.html'>N95 Face Mask</a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item-has-children"><a href="#">Hospital Equipment</a>
                                        <ul className="dropdown">
                                            <li><a href='product-details.html'>Hospital Ward Bed</a></li>
                                            <li><a href='product-details.html'>Lightweight Transport Chair</a></li>
                                            <li><a href='product-details.html'>Men V-Neck Scrub Top</a></li>
                                            <li><a href='product-details.html'>Essentials Pocket Scrub</a></li>
                                            <li><a href='product-details.html'>Manual Oxygen Device</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children "><a href='blog.html'>Blog</a>
                                <ul className="dropdown">
                                    <li><a href='blog.html'>Blog Grid – Left Sidebar</a></li>
                                    <li><a href='blog-grid-right-sidebar.html'>Blog Grid – Right Sidebar</a></li>
                                    <li><a href='blog-grid-no-sidebar.html'>Blog Grid – No Sidebar</a></li>
                                    <li><a href='blog-grid-wide.html'>Grid Wide</a></li>
                                    <li className="menu-item-has-children"><a href="#">Single Layout</a>
                                        <ul className="dropdown">
                                            <li><a href='blog-details.html'>Left Sidebar</a></li>
                                            <li><a href='blog-details-right-sidebar.html'>Right Sidebar</a></li>
                                            <li><a href='blog-details-no-sidebar.html'>No Sidebar</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children"><a href="#">Pages</a>
                                <ul className="dropdown">
                                    <li><a href='about-us.html'>About Us</a></li>
                                    <li><a href='contact-us.html'>Contact</a></li>
                                    <li><a href='purchase-guide.html'>Purchase Guide</a></li>
                                    <li><a href='privacy-policy.html'>Privacy Policy</a></li>
                                    <li><a href='terms-of-service.html'>Terms of Service</a></li>
                                    <li><a href='404.html'>404 Page</a></li>
                                </ul>
                            </li>
                            <li><a href='contact-us.html'>Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="mobile-header-info-wrap mobile-header-border">
                    <div className="single-mobile-header-info">
                        <a target="_blank" href="https://www.google.com/maps"> Store location </a>
                    </div>
                    <div className="single-mobile-header-info">
                        <a href='login-register.html'>Log In / Sign Up </a>
                    </div>
                    <div className="single-mobile-header-info">
                        <a href="#">(+88) - 1990 - 6886 </a>
                    </div>
                    <div className="single-mobile-header-info">
                        <a className="mobile-language-active" href="#">Language <span><i className="far fa-angle-down"></i></span></a>
                        <div className="lang-curr-dropdown lang-dropdown-active">
                            <ul>
                                <li><a href="#">English</a></li>
                                <li><a href="#">French</a></li>
                                <li><a href="#">German</a></li>
                                <li><a href="#">Spanish</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mobile-social-icon">
                    <a className="facebook" href="#"><i className="fab fa-facebook-f"></i></a>
                    <a className="twitter" href="#"><i className="fab fa-twitter"></i></a>
                    <a className="tumblr" href="#"><i className="fab fa-tumblr"></i></a>
                    <a className="instagram" href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
    );
}