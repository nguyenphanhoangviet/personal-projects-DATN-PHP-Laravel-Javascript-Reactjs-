import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false); // Trạng thái thành công
  const [error, setError] = useState(null); // Trạng thái lỗi
  const tableInitialized = useRef(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/coupons/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoupons(response.data.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách mã giảm giá!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    if (!loading && coupons.length > 0 && !tableInitialized.current) {
      $("#MyTable").DataTable({
        paging: true,
        searching: true,
        columnDefs: [
          { orderable: false, targets: [10, 11] }, // Vô hiệu hóa sắp xếp cho cột "Hết hạn" và "Hành động"
        ],
      });
      tableInitialized.current = true;
    }
  }, [coupons, loading]);

  const deleteCoupon = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa mã giảm giá này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/coupons/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
      setSuccess("Xóa mã giảm giá thành công!");
      setError(null); // Đảm bảo xoá trạng thái lỗi nếu có
    } catch (error) {
      setSuccess(false); // Đảm bảo xoá trạng thái thành công nếu có
      setError("Đã có lỗi xảy ra khi xóa mã giảm giá!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const toggleCouponStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/coupons/update-status/${id}`,
        { id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === id ? { ...coupon, status: newStatus } : coupon
        )
      );
      setSuccess("Cập nhật trạng thái mã giảm giá thành công!");
      setError(null); // Đảm bảo xoá trạng thái lỗi nếu có
    } catch (error) {
      setSuccess(false); // Đảm bảo xoá trạng thái thành công nếu có
      setError("Đã có lỗi xảy ra khi thay đổi trạng thái mã giảm giá!");
      console.error(
        "Lỗi khi thay đổi trạng thái:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const sendVipCoupon = (coupon) => {
    axios
      .post("http://localhost:8000/api/coupons/send-user-vip-coupon", coupon)
      .then((response) => {
        alert("VIP Coupons sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending VIP coupons:", error);
      });
  };

  const sendRegularCoupon = (coupon) => {
    axios
      .post("http://localhost:8000/api/coupons/send-user-coupon", coupon)
      .then((response) => {
        alert("Regular Coupons sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending regular coupons:", error);
      });
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 5000); // 5 giây
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (loading) {
    return <div>Đang tải danh sách mã giảm giá...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-header">Danh sách mã giảm giá</h5>
          <Link to="/add-coupon">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm mã giảm giá
            </button>
          </Link>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="MyTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên mã giảm giá</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Người tạo</th>
                <th>Mã giảm giá</th>
                <th>Số lượng giảm giá</th>
                <th>Số giảm</th>
                <th>Điều kiện giảm giá</th>
                <th>Trạng thái</th>
                <th>Hết hạn</th>
                <th>Gửi mã</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.date_start}</td>
                  <td>{coupon.date_end}</td>
                  <td>{coupon.user_id}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.time}</td>
                  <td>{coupon.number}</td>
                  <td>
                    {coupon.condition === 1 ? "Giảm theo %" : "Giảm theo tiền"}
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        coupon.status === 1 ? "btn-primary" : "btn-danger"
                      }`}
                      onClick={() =>
                        toggleCouponStatus(coupon.id, coupon.status)
                      }
                    >
                      {coupon.status === 1 ? "Kích hoạt" : "Vô hiệu hóa"}
                    </button>
                  </td>
                  <td>
                    {new Date(coupon.date_end) < new Date() ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Đã hết hạn
                      </span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Còn hiệu lực
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ margin: "5px 0" }}
                      onClick={() => sendVipCoupon(coupon)}
                    >
                      Khách VIP
                    </button>
                    <br />
                    <button
                      className="btn btn-primary"
                      style={{ margin: "5px 0" }}
                      onClick={() => sendRegularCoupon(coupon)}
                    >
                      Khách thường
                    </button>
                  </td>
                  <td>
                    <div>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/edit-coupon/${coupon.id}`}
                      >
                        <i
                          className="bx bx-edit-alt me-1"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCoupon(coupon.id)}
                      >
                        <i
                          className="bx bx-trash me-1"
                          style={{ color: "red" }}
                        ></i>{" "}
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
