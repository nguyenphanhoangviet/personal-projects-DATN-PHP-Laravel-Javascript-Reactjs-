import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCoupon = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  // State quản lý dữ liệu
  const [coupon, setCoupon] = useState({
    name: "",
    user_id: "",
    time: "",
    condition: "",
    number: "",
    code: "",
    date_start: null,
    date_end: null,
    status: false,
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [success, setSuccess] = useState(false); // Trạng thái thành công

  // Lấy thông tin mã giảm giá từ API
  useEffect(() => {
    const fetchCoupon = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/coupons/show/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setCoupon({
          ...data,
          date_start: formatDate(coupon.date_start),
          date_end: formatDate(coupon.date_end),
        });
      } catch (err) {
        setError("Không thể tải thông tin mã giảm giá.");
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  // Xử lý thay đổi giá trị của các trường
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCoupon({
      ...coupon,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Xử lý thay đổi ngày
  const handleDateChange = (name, date) => {
    setCoupon({
      ...coupon,
      [name]: date,
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const payload = {
        ...coupon,
        date_start: formatDate(coupon.date_start),
        date_end: formatDate(coupon.date_end),
      };
      await axios.post(
        `http://localhost:8000/api/coupons/update/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            _method: "PUT",
          },
        }
      );
      setSuccess(true);
      setTimeout(() => navigate("/coupons"), 2000); // Chuyển hướng sau 2 giây
    } catch (err) {
      setError("Không thể cập nhật mã giảm giá.");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Chỉnh sửa mã giảm giá</h5>
        <div className="card-body">
          {loading && <div>Đang tải...</div>}
          {success && (
            <div className="alert alert-success">
              Cập nhật mã giảm giá thành công!
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên mã giảm giá</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={coupon.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ID người dùng</label>
              <input
                type="number"
                className="form-control"
                name="user_id"
                value={coupon.user_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số lượng</label>
              <input
                type="text"
                className="form-control"
                name="time"
                value={coupon.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Điều kiện</label>
              <select
                name="condition"
                value={coupon.condition}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Chọn điều kiện</option>
                <option value={1}>%</option>
                <option value={2}>Đ</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Số tiền</label>
              <input
                type="number"
                className="form-control"
                name="number"
                value={coupon.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={coupon.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày bắt đầu</label>
              <DatePicker
                selected={coupon.date_start}
                onChange={(date) => handleDateChange("date_start", date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Chọn ngày bắt đầu"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày kết thúc</label>
              <DatePicker
                selected={coupon.date_end}
                onChange={(date) => handleDateChange("date_end", date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Chọn ngày kết thúc"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={coupon.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Kích hoạt</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCoupon;
