import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRoles = () => {
  const { id } = useParams(); // Get role ID from URL
  const [role, setRole] = useState({
    name: "",
    status: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("token");
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:8000/api/roles/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRole(response.data);
      } catch (error) {
        setError("Error fetching role details.");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRole();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRole({
      ...role,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading

    try {
      await axios.post(
        `http://localhost:8000/api/roles/update/${id}`,
        role,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            _method: "put",
          },
        }
      );
      alert("Cập nhật thành công!");
      navigate("/roles");
    } catch (error) {
      setError("Error updating the role.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Chỉnh sửa vai trò</h5>
        <div className="card-body">
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên vai trò</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={role.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={role.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Hoạt động</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật vai trò
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
