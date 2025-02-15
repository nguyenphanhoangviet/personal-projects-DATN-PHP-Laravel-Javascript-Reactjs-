import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewOrder() {
  const { order_code } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/orders/view_order/${order_code}`)
      .then((response) => {
        if (response.data.success) {
          setOrderData(response.data);
          calculateTotals(response.data);
        }
      })
      .catch((error) => console.error("Error fetching order data", error));
  }, [order_code]);

  const calculateTotals = (data) => {
    const { order_items = [], condition, number } = data;

    // Calculate total amount without coupon
    let sub_total = order_items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubTotal(sub_total);

    // Calculate discount and total after applying coupon
    let discountAmount = 0;
    if (condition === 1) {
      // Percentage discount
      discountAmount = (sub_total * number) / 100;
    } else if (condition === 2) {
      // Fixed amount discount
      discountAmount = number;
    }
    setDiscount(discountAmount);
    setTotal(sub_total - discountAmount + feeShip);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrderData((prevData) => {
      const updatedOrderItems = prevData.order_items.map((item) => {
        if (item.id === itemId) {
          // Check if new quantity exceeds stock
          if (newQuantity > item.product.qty) {
            alert("Số lượng yêu cầu vượt quá số lượng trong kho!");
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { ...prevData, order_items: updatedOrderItems };
    });
  };

  const updateOrderQuantity = async (productId, orderCode, quantity) => {
    try {
      await axios.post("http://localhost:8000/api/orders/update_order_qty", {
        product_id: productId,
        order_code: orderCode,
        quantity,
      });
      alert("Cập nhật số lượng thành công!");
    } catch (error) {
      console.error("Error updating quantity", error);
      alert("Lỗi khi cập nhật số lượng!");
    }
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");

      // Ask for the new status
      const newStatus = prompt(
        "Nhập trạng thái mới (Pending, Delivered, Out for Delivery, Cancelled, Accepted):",
        currentStatus
      );

      if (!newStatus) return; // If no new status is entered, return early

      // Make the API call to update the order status
      await axios.post(
        `http://localhost:8000/api/orders/change_order_status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrderData((prevData) => ({
        ...prevData,
        orders: prevData.orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ),
      }));
      alert("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      setError("Lỗi khi cập nhật trạng thái đơn hàng!");
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  const feeShip = 50000;

  if (!orderData) return <div>Loading...</div>;

  const { user, orders, order_items = [] } = orderData;
  console.log(orderData); // Inspect the structure of orderData

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header text-center">Chi tiết Đơn Hàng</h5>

        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="card md-6">
            <a
              href={`http://localhost:8000/api/orders/print_order/${order_code}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="btn rounded-pill btn-primary m-6"
              >
                In PDF chi tiết
              </button>
            </a>
          </div>
        </div>

        {/* Customer Information */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white text-center">
            THÔNG TIN ĐĂNG NHẬP
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Thông Tin</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Tên khách hàng</strong>
                  </td>
                  <td>{user?.name || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại</strong>
                  </td>
                  <td>{user?.phone || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email</strong>
                  </td>
                  <td>{user?.email || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white text-center">
            THÔNG TIN VẬN CHUYỂN HÀNG
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Thông Tin</th>
                  <th>Chi Tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Tên người vận chuyển</strong>
                  </td>
                  <td>{order_items[0]?.shipper_name || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Địa chỉ</strong>
                  </td>
                  <td>{user?.address || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Ghi chú</strong>
                  </td>
                  <td>{order_items[0]?.note || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hình thức thanh toán</strong>
                  </td>
                  <td>{orders[0]?.payment_method || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details */}
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            LIỆT KÊ CHI TIẾT ĐƠN HÀNG
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng trong kho còn</th>
                  <th>Mã giảm giá</th>
                  <th>Phí ship hàng</th>
                  <th>Số lượng</th>
                  <th>Giá sản phẩm</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {order_items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product?.name || "N/A"}</td>
                    <td>
                      {item.product?.qty !== undefined
                        ? item.product.qty
                        : "N/A"}
                    </td>
                    <td>
                      {item.coupon_code && item.coupon_code !== "no"
                        ? item.coupon_code
                        : "Không mã"}
                    </td>
                    <td>{(item.shipping_fee || 50000).toLocaleString()} đ</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          style={{
                            width: "60px",
                            marginRight: "10px",
                            textAlign: "center",
                          }}
                          disabled={orders[0]?.status === "Delivered" || orders[0]?.status === "Out for Delivery"|| orders[0]?.status === "Cancelled" || orders[0]?.status === "Accepted"} // Disable input if order is delivered
                        />
                        <button
                          className="btn btn-default"
                          style={{ padding: "5px 10px" }}
                          onClick={() =>
                            updateOrderQuantity(
                              item.product_id,
                              order_code,
                              item.quantity
                            )
                          }
                          disabled={orders[0]?.status === "Delivered" || orders[0]?.status === "Out for Delivery"|| orders[0]?.status === "Cancelled" || orders[0]?.status === "Accepted"} // Disable button if order is delivered
                        >
                          Cập nhật
                        </button>
                      </div>
                    </td>

                    <td>{item.price.toLocaleString()} đ</td>
                    <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
              <tr>
                <td colSpan={2}>
                  <strong>Tổng giảm:</strong>
                  {discount.toLocaleString()} đ <br />
                  <strong>Phí ship:</strong>
                  {feeShip.toLocaleString()} đ<br />
                  <strong>Thanh toán:</strong>
                  {total.toLocaleString()} đ
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <select
            className="form-select form-select-sm"
            value={orders[0]?.status || ""}
            onChange={(e) => updateOrderStatus(orders[0]?.id, e.target.value)}
          >
            <option value="">--------Chọn trạng thái đơn hàng--------</option>

           
            {orders[0]?.status === "Pending" && (
              <>
                <option value="Pending" disabled>Đơn hàng mới - chờ xử lý</option>
                <option value="Delivered">Đã xử lí đơn hàng</option>
              </>
            )}

            {orders[0]?.status === "Delivered" && (
              <>
                <option disabled value="Delivered">Đã xử lí đơn hàng</option>
                <option value="Out for Delivery">Đơn hàng đang được giao</option>
                <option value="Cancelled">Đơn hàng bị hủy</option>
              </>
            )}

            {orders[0]?.status === "Out for Delivery" && (
              <>
                <option value="Out for Delivery" disabled>Đơn hàng đang được giao</option>
                <option value="Accepted">Đơn hàng đã được giao</option>
                <option value="Cancelled">Đơn hàng bị hủy</option>
              </>
            )}

            {orders[0]?.status === "Cancelled" && (
              <>
                <option value="Cancelled" disabled>Đơn hàng bị hủy</option>
              </>
            )}

            {orders[0]?.status === "Accepted" && (
              <>
                <option value="Accepted" disabled>Đơn hàng đã được giao</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
