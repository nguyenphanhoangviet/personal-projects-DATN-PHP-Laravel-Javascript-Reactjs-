import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProductTypes = () => {
  const [productType, setProductType] = useState({ name: "", slug: "", status: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateSlug = (text) => {
    // Convert to lowercase
    text = text.toLowerCase();
  
    // Replace accented characters with non-accented equivalents (similar to your PHP function)
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/g, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
      .replace(/đ/g, 'd');
  
    // Remove special characters
    text = text.replace(/[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g, '');
  
    // Replace spaces with dashes
    text = text.replace(/\s+/g, '-');
  
    // Replace multiple dashes with a single dash
    text = text.replace(/-+/g, '-');
  
    // Trim dashes from the beginning and end
    return text.trim('-');
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductType({
      ...productType,
      [name]: type === "checkbox" ? checked : value,
      ...(name === 'name' && { slug: generateSlug(value) }) // Automatically update slug when the name changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8000/api/product_types/store", productType, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Dạng sản phẩm được thêm thành công!");
      navigate("/product-types"); // Redirect to product type list after successful creation
    } catch (error) {
      setError("Error occurred while adding the product type!");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Add Product Type</h5>
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
                
                readOnly // Make slug readonly as it will be auto-generated
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
              Add Product Type
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductTypes;
