import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { removeFromWishList } from "../../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
  };

  const handleRemoveFromWishlist = async (item) => {
    // Dispatch the action to remove from wishlist
    dispatch(removeFromWishList(item));

    try {
      // Make an API call to decrement the favorite count for the product
      const response = await axios.post(
        `/api/products/${item.id}/decrement-favorite`
      );
      console.log(response.data.message); // Log the response message
    } catch (error) {
      console.error("Error removing from wishlist:", error); // Log any error
    }
  };

  return (
    <div>
      <div className="wishlist-area pt-75 pb-75">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wishlist-table-content">
                <div className="table-content table-responsive">
                  {wishlistItems.length === 0 ? (
                    <p>Bạn chưa có sản phẩm yêu thích!</p>
                  ) : (
                    <table className="table table-bordered">
                      <tbody>
                        {wishlistItems.map((item) => (
                          <tr key={item.id}>
                            <td className="wishlist-product-thumbnail">
                              <button
                                onClick={() => handleRemoveFromWishlist(item)}
                                aria-label="Remove from Wishlist"
                                className="btn btn-danger btn-sm"
                              >
                                <i className="far fa-times"></i>
                              </button>
                            </td>
                            <td className="wishlist-product-img">
                              <Link to={`/product-detail/${item.id}`}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid"
                                />
                              </Link>
                            </td>
                            <td className="wishlist-product-info">
                              <h5>
                                <Link to={`/product-detail/${item.id}`}>
                                  {item.name}
                                </Link>
                              </h5>
                              <div className="wishlist-product-price">
                                <span className="new-price">
                                  {item.price.toLocaleString()}đ
                                </span>
                                <span className="old-price">
                                  {item.price_cost.toLocaleString()}đ
                                </span>
                              </div>
                              <span>{item.dateAdded}</span>
                            </td>
                            <td className="wishlist-product-add-wrap">
                              <span>In stock</span>
                              <div className="wishlist-product-add">
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  aria-label="Add to Cart"
                                  className="btn btn-primary btn-sm"
                                >
                                  Thêm vào giỏ hàng
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="wishlist-bottom">
                <div className="wishlist-social-wrap">
                  <span>Share on:</span>
                  <div className="wishlist-social">
                    <a href="#" className="me-2">Facebook</a>
                    <a href="#" className="me-2">Twitter</a>
                    <a href="#" className="me-2">Pinterest</a>
                    <a href="#">Mail</a>
                  </div>
                </div>
                <div className="wishlist-link">
                  <span>Wishlist link:</span>
                  <div className="wishlist-input-wrap">
                    <div className="wishlist-input">
                      <input
                        id="copy"
                        type="url"
                        value="https://example.com/wishlist"
                        readOnly
                        className="form-control"
                      />
                    </div>
                    <div className="wishlist-btn">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "https://example.com/wishlist"
                          );
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
