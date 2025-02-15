import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditWarehouse = () => {
  const [users, setUsers] = useState([]);
  const [warehouse, setWarehouse] = useState({ location: "", status: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get warehouse ID from route params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userRes = await axios.get(
          "http://localhost:8000/api/users/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const filteredUsers = userRes.data.data.filter(
          (user) => user.role_id === 3
        );
        setUsers(filteredUsers);

        // Fetch the warehouse details
        const warehouseRes = await axios.get(
          `http://localhost:8000/api/warehouses/show/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWarehouse(warehouseRes.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWarehouse({
      ...warehouse,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:8000/api/warehouses/update/${id}`,
        warehouse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            method: "PUT",
          },
        }
      );
      alert("Nhà kho đã được cập nhật thành công!");
      navigate("/warehouses"); // Redirect to warehouse list after successful update
    } catch (error) {
      setError("Lỗi khi cập nhật nhà kho!");
      console.error(
        "lỗi:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Chỉnh sửa nhà kho</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nhân viên quản lí </label>
              <select
                name="user_id"
                className="form-control"
                value={warehouse.user_id || "0"}
                onChange={handleChange}
              >
                <option value="0">Chọn nhân viên</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Địa chỉ kho</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={warehouse.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={warehouse.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Hoạt động</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật Nhà kho
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWarehouse;
