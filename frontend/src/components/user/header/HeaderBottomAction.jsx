import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/slices/cartSlice";
import axios from "axios";

export default function HeaderBottomAction() {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const sub_total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 50000;
  const total = sub_total + shippingFee;

  const handleSearchIconClick = () => {
    setIsSearchActive((prev) => !prev);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`/search-suggestions`, {
          params: { keywords_suggest: query },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="header-action-right">
      <div className="header-action">
        <div className="header-action-icon">
          <a
            className={`search-active ${isSearchActive ? "active hidden" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSearchIconClick();
            }}
          >
            <i className="far fa-search"></i>
          </a>

          {isSearchActive && (
            <div
              className="search-input-wrapper"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-150px",
                  width: "150px",
                  padding: "8px",
                  borderRadius: "4px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  zIndex: 10,
                }}
              />
              {searchResults.length > 0 && (
                <ul
                  className="search-results"
                  style={{
                    position: "absolute",
                    top: "35px", // Adjust below the input box
                    left: "-150px",
                    width: "260px",
                    zIndex: 10,
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      style={{ padding: "8px", cursor: "pointer" }}
                    >
                       <Link to={`/product-detail/${item.slug}/${item.id}`}>
                        <img
                          src={item.image || "assets/images/default.jpg"}
                          alt={item.name}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "8px",
                          }}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="header-action-icon">
          <a href="/wishlist">
            <i className="far fa-heart"></i>
            <span className="pro-count blue">{wishlist.length}</span>
          </a>
        </div>
        <div className="header-action-icon header-action-mrg-none">
          <Link to="/cart">
            <i className="far fa-shopping-bag"></i>
            <span className="pro-count blue">{cartItems.length}</span>
          </Link>
          <div className="cart-dropdown-wrap">
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="shopping-cart-img">
                    <Link to={`/product/${item.id}`}>
                      <img
                        alt={item.name}
                        src={item.image || "assets/images/cart/cart-1.jpg"}
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h4>
                    <h3>
                      <span>{item.quantity} × </span>
                      {item.price.toLocaleString("vi-VN")}đ
                    </h3>
                  </div>
                  <div className="shopping-cart-delete">
                    <a href="#" onClick={() => dispatch(removeFromCart(item))}>
                      <i className="far fa-times"></i>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="shopping-cart-footer">
              <div className="shopping-cart-total">
                Phí vận chuyển <h4>{shippingFee.toLocaleString("vi-VN")}đ</h4>
                <h4>
                  Tổng cộng <span>{total.toLocaleString("vi-VN")}đ</span>
                </h4>
              </div>
              <div className="shopping-cart-button">
                <Link to="/cart">View cart</Link>
                <Link to="/checkout">Checkout</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-action-icon d-block d-lg-none">
          <div className="burger-icon">
            <span className="burger-icon-top"></span>
            <span className="burger-icon-bottom"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
