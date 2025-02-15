import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProductTypes = () => {
  const { id } = useParams(); // Get product type ID from URL
  const [productType, setProductType] = useState({
    name: "",
    slug: "",
    status: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateSlug = (text) => {
    text = text.toLowerCase();
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d")
      .replace(
        /[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g,
        ""
      )
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return text.trim("-");
  };

  useEffect(() => {
    const fetchProductType = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product_types/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductType(response.data);
      } catch (error) {
        setError("Error fetching product type details.");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProductType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductType({
      ...productType,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && { slug: generateSlug(value) }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8000/api/product_types/update/${id}`,
        productType,
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
      navigate("/product-types");
    } catch (error) {
      setError("Error updating the product type.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Edit Product Type</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Type Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={productType.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={productType.slug}
                readOnly
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={productType.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Active</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Product Type
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductTypes;
