import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
    const {cartItems} = useSelector(state=> state.cart)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-cart h1"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="navbar-brand" to="/">
                <i className="bi bi-house"> Home</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/product_shop">
                <i className="bi bi-shop"> Shop</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-check"></i> Cart({cartItems.length})
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/login">
                <i className="bi bi-user"> Login</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/register">
                <i className="bi bi-user"> Register</i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand" to="/your_profile">
                <i className="bi bi-user"> Your profile</i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
