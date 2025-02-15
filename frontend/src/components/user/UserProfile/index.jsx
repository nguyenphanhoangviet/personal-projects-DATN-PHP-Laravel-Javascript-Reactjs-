import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.scss";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  // user information
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [image, setImage] = useState(null); // To store new image
  const [existingImage, setExistingImage] = useState(null); // To store the current image
  const [statusMessage, setStatusMessage] = useState("");
  // orders
  const [orders, setOrders] = useState([]);

  // Password reset
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderDetailId, setOrderDetailId] = useState(null);
  //user orders

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch the user data from the API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/auth/your_profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const userData = response.data;
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setExistingImage(userData.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // get user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `/get_user_orders/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    // Validate that the new password is at least 8 characters long
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.put(
        `/change_user_password/${user.id}`, // Assuming user_id is stored in localStorage
        { password, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Password updated successfully");
        Swal.fire("Success", "Password updated successfully", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Sai mật khẩu cũ");
    }
  };

  const changeUserInformation = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/change_user_info/${user.id}`,
        { name, email, phone, image },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("User information updated successfully");
        Swal.fire(
          "Success",
          "User information updated successfully",
          "success"
        );
      }
    } catch (error) {
      setError("Failed to update user information");
      console.error("Update error:", error);
    }
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Save the new image
    setUser((prev) => ({ ...prev, image: file })); // Update the user with the new image
  };
  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;
  //   if (name === "image") {
  //     const file = files[0];
  //     if (file && file.size > 2 * 1024 * 1024) { // Example: 2MB max size
  //       setError("File size exceeds 2MB");
  //       return;
  //     }
  //     setBrand({ ...brand, image: file });
  //   } else {
  //     setBrand({ ...brand, [name]: type === "checkbox" ? checked : value,
  //       ...(name === 'name' && { slug: generateSlug(value) }) // Automatically update slug when the name changes
  //      });
      
  //   }
  // };

  useEffect(() => {
    if (performance.navigation.type === 1) {
      setOrderDetail(true);
    }
    fetchOrders();
  }, []);

  return (
    <div className="my-account-area pt-75 pb-75">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* My Account Page Start */}
            <div className="myaccount-page-wrapper">
              {/* My Account Tab Menu Start */}
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="myaccount-tab-menu nav" role="tablist">
                    <Link
                      to="#dashboard"
                      className={activeTab === "dashboard" ? "active" : ""}
                      onClick={() => handleTabChange("dashboard")}
                    >
                      Thông tin tài khoản
                    </Link>
                    <Link
                      to="#orders"
                      className={activeTab === "orders" ? "active" : ""}
                      onClick={() => handleTabChange("orders")}
                    >
                      Đơn hàng
                    </Link>
                    {/* <Link to="#address-edit" className={activeTab === "address-edit" ? "active" : ""} onClick={() => handleTabChange("address-edit")}>Address</Link> */}
                    <Link
                      to="#account-info"
                      className={activeTab === "account-info" ? "active" : ""}
                      onClick={() => handleTabChange("account-info")}
                    >
                      Đổi mật khẩu
                    </Link>
                    <Link to="/">Thoát</Link>
                  </div>
                </div>

                <div className="col-lg-8 col-md-8">
                  <div className="tab-content" id="myaccountContent">
                    {/* Dashboard Tab Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "dashboard" ? "show active" : ""
                      }`}
                      id="dashboard"
                      role="tabpanel"
                    >
                      <div className="myaccount-content">
                        <div className="account-details-form">
                          <form onSubmit={changeUserInformation}>
                            <fieldset>
                              <legend>Thông tin tài khoản</legend>
                              <div className="row">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Ảnh thương hiệu
                                  </label>
                                  {existingImage && (
                                    <div className="mb-3">
                                      <img
                                        src={`${existingImage}`}
                                        alt="Thương hiệu"
                                        width="100"
                                      />
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </div>
                                <div className="col-lg-12">
                                  <div className="account-info input-style mb-30">
                                    <label>Name *</label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="account-info input-style mb-30">
                                    <label>Email</label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="account-info input-style">
                                    <label>Phone</label>
                                    <input
                                      type="number"
                                      name="phone"
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>

                            <div className="account-info-btn">
                              <button type="submit">Lưu</button>
                            </div>
                            {/* Display success or error message */}
                            {success && (
                              <p style={{ color: "green" }}>{success}</p>
                            )}
                            {error && <p style={{ color: "red" }}>{error}</p>}
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Orders Tab Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "orders" ? "show active" : ""
                      }`}
                      id="orders"
                      role="tabpanel"
                    >
                      <div className="myaccount-content">
                        <div className="myaccount-table table-responsive text-center">
                          {orderDetail ? (
                            <table className="table table-bordered">
                              <thead className="thead-light">
                                <tr>
                                  <th>Mã đơn hàng</th>
                                  <th>Ngày đặt</th>
                                  <th>Trạng thái</th>
                                  <th>Tổng tiền</th>
                                  <th>Hành động</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders ? (
                                  orders.map((order) => {
                                    return (
                                      <tr key={order.id}>
                                        <td>{order.order_code}</td>{" "}
                                        {/* Display order code */}
                                        <td>
                                          {new Date(
                                            order.date_deliver
                                          ).toLocaleDateString()}
                                        </td>{" "}
                                        {/* Format date */}
                                        <td>{order.status}</td>{" "}
                                        {/* Display status */}
                                        <td>
                                          {order.total_price.toLocaleString()}{" "}
                                          VND
                                        </td>{" "}
                                        {/* Format total price */}
                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={() => {
                                              setOrderDetailId(order.id);
                                              setOrderDetail(false);
                                            }}
                                          >
                                            Xem chi tiết
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td colSpan="5">No orders found.</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          ) : (
                            <div>
                              {/* <h3>Order Detail</h3> */}
                              {/* table show chi tiet san pham */}
                              <table className="table table-bordered">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Ảnh sản phẩm</th>
                                    <th className="name-order-userinfo">Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderDetailId &&
                                    orders.map((order) => {
                                      if (order.id == orderDetailId) {
                                        return order.items.map((item) => (
                                          <tr key={item.id}>
                                            <td>
                                              <img src={item.product.image} alt="" className="img-order-userinfo" />
                                            </td>
                                            <td className="name-order-userinfo">{item.product_name} {item.product_name}</td>
                                            <td>
                                              {item.price.toLocaleString()} VND
                                            </td>
                                            <td>{item.quantity}</td>
                                          </tr>
                                        ));
                                      }
                                    })}
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-link"
                                      onClick={() => setOrderDetail(true)}
                                    >
                                      Back
                                    </button>
                                  </td>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Address Edit Tab Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "address-edit" ? "show active" : ""
                      }`}
                      id="address-edit"
                      role="tabpanel"
                    >
                      <div className="myaccount-content myaccount-address">
                        <p>
                          The following addresses will be used on the checkout
                          page by default.
                        </p>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12 col-sm-6">
                            <div className="myaccount-address-wrap">
                              <h3>Billing address</h3>
                              <div className="myaccount-address-content">
                                <h4>Alex Tuntuni</h4>
                                <p>
                                  1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103
                                </p>
                                <p>Mobile: (123) 456-7890</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12 col-sm-6">
                            <div className="myaccount-address-wrap">
                              <h3>Shipping address</h3>
                              <div className="myaccount-address-content">
                                <h4>Alex Tuntuni</h4>
                                <p>
                                  1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103
                                </p>
                                <p>Mobile: (123) 456-7890</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Account Info Tab Content */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "account-info" ? "show active" : ""
                      }`}
                      id="account-info"
                      role="tabpanel"
                    >
                      <div className="myaccount-content">
                        <div className="account-details-form">
                          <form onSubmit={handleSubmit}>
                            <fieldset>
                              <legend>Đổi mật khẩu</legend>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="account-info input-style mb-30">
                                    <label>Mật khẩu hiện tại</label>
                                    <input
                                      type="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="account-info input-style mb-30">
                                    <label>Mật khẩu mới</label>
                                    <input
                                      type="password"
                                      value={newPassword}
                                      onChange={(e) =>
                                        setNewPassword(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="account-info input-style">
                                    <label>Nhập lại mật khẩu</label>
                                    <input
                                      type="password"
                                      value={confirmPassword}
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>

                            {/* Display success or error messages */}
                            {success && (
                              <p style={{ color: "green" }}>{success}</p>
                            )}

                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <div className="account-info-btn">
                              <button type="submit">Lưu</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* My Account Tab Content End */}
                </div>
              </div>
            </div>{" "}
            {/* My Account Page End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
