import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBrands = () => {
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    status: false,
    image: null, // Thêm thuộc tính image vào trạng thái brand
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Để điều hướng

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
    const { name, value, type, checked, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) { // Example: 2MB max size
        setError("File size exceeds 2MB");
        return;
      }
      setBrand({ ...brand, image: file });
    } else {
      setBrand({ ...brand, [name]: type === "checkbox" ? checked : value,
        ...(name === 'name' && { slug: generateSlug(value) }) // Automatically update slug when the name changes
       });
      
    }
  };
  

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   if (name === "image") {
  //     setBrand({
  //       ...brand,
  //       image: e.target.files[0], // Xử lý đầu vào file
  //     });
  //   } else {
  //     setBrand({
  //       ...brand,
  //       [name]: type === "checkbox" ? checked : value,
  //       ...(name === 'name' && { slug: generateSlug(value) }) // Automatically update slug when the name changes

  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Tạo một đối tượng FormData để gửi dữ liệu biểu mẫu bao gồm cả hình ảnh
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("slug", brand.slug);
    formData.append("status", brand.status ? 1 : 0); // Chuyển đổi boolean thành 1/0 cho backend
    formData.append("image", brand.image); // Thêm hình ảnh

    try {
      await axios.post("http://localhost:8000/api/brands/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Bao gồm token trong header của yêu cầu
          "Content-Type": "multipart/form-data", // Đặt content type thành multipart/form-data
        },
      });
      alert("Thương hiệu được thêm thành công!");
      navigate("/brands"); // Chuyển hướng đến danh sách thương hiệu sau khi thêm thành công
    } catch (error) {
      const errMsg = error.response?.data?.message || "Đã có lỗi xảy ra khi thêm thương hiệu!";
      setError(errMsg);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Thêm thương hiệu</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên thương hiệu</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={brand.name}
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
                value={brand.slug}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Thêm ảnh thương hiệu</label>
              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={brand.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Kích hoạt</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Thêm thương hiệu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrands;
