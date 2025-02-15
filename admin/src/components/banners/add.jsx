import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBanners = () => {
  const [banner, setBanner] = useState({
    name: "",
    description: "",
    size: "1", // Default to the first size
    status: false,
    image_path: null, 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image_path") {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB");
        return;
      }
      setBanner({ ...banner, image_path: file });
    } else {
      setBanner({ ...banner, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("name", banner.name);
    formData.append("description", banner.description);
    formData.append("size", banner.size); 
    formData.append("status", banner.status ? 1 : 0);
    formData.append("image_path", banner.image_path); 
  
    try {
      await axios.post("http://localhost:8000/api/banners/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Banner added successfully!");
      navigate("/banners");
    } catch (error) {
      const errMsg = error.response?.data?.message || "An error occurred!";
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        setError(Object.values(validationErrors).flat().join("\n"));
      } else {
        setError(errMsg);
      }
    }
  };
  

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Add New Banner</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Banner Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={banner.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={banner.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Size</label>
              <select
                name="size"
                value={banner.size}
                onChange={handleChange}
                className="form-control"
              >
                <option value={1}>800x600</option>
                <option value={2}>650x250</option>
                <option value={3}>525x425</option>
                <option value={4}>250x200</option>
                <option value={5}>400x125</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                name="image_path"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={banner.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Activate</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Banner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanners;
