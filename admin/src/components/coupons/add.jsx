import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    name: "",
    number: "",
    code: "",
    time: "",
    condition: "",
    date_start: null, // Lưu dưới dạng Date object
    date_end: null,   // Lưu dưới dạng Date object
    status: false,    // Checkbox trạng thái
    user_id: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (name, date) => {
    setCoupon((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCoupon({
      ...coupon,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formattedCoupon = {
      ...coupon,
      date_start: formatDate(coupon.date_start),
      date_end: formatDate(coupon.date_end),
    };

    try {
      await axios.post("http://localhost:8000/api/coupons/store", formattedCoupon, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Coupon added successfully!");
      navigate("/coupons");
    } catch (error) {
      setError("Error occurred while adding the coupon!");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Add Coupon</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Coupon Name</label>
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
              <label className="form-label">User ID</label>
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
              <label className="form-label">Time</label>
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
              <label className="form-label">Condition</label>
              <select
                name="condition"
                value={coupon.condition}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Condition</option>
                <option value={1}>%</option>
                <option value={2}>Đ</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Number</label>
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
              <label className="form-label">Code</label>
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
              <label className="form-label">Start Date</label>
              <DatePicker
                selected={coupon.date_start}
                onChange={(date) => handleDateChange("date_start", date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <DatePicker
                selected={coupon.date_end}
                onChange={(date) => handleDateChange("date_end", date)}
                className="form-control"
                dateFormat="dd/MM/yyyy"
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
              <label className="form-check-label">Active</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
