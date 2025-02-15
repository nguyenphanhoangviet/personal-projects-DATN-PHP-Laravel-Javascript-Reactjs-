import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBrands = () => {
  const { id } = useParams(); // To get the brand id from the URL
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    status: false,
    image: null,
  }); // Initial state for the brand data

  const [image, setImage] = useState(null); // To store new image
  const [existingImage, setExistingImage] = useState(null); // To store the current image
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  // Slug generation function
  const generateSlug = (text) => {
    text = text.toLowerCase();
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/g, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
    return text;
  };

  // Fetch brand data when the component mounts
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/brands/show/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBrand(response.data); // Set the fetched brand data
        setExistingImage(response.data.image); // Store the existing image
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy thương hiệu!");
      }
    };

    fetchBrand();
  }, [id]);

  // Handle input changes (name, slug, status)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBrand((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === 'name' && { slug: generateSlug(value) }) // Generate slug automatically from name
    }));
  };

  // Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Save the new image
    setBrand((prev) => ({ ...prev, image: file })); // Update the brand with the new image
  };

  // Handle form submission to update the brand
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Create FormData to handle file upload and brand details
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("slug", brand.slug);
    formData.append("status", brand.status ? 1 : 0);
    
    // Only append the new image if it's different from the existing one
    if (image && image !== existingImage) {
      formData.append("image", image);
    }

    try {
      await axios.post(`http://localhost:8000/api/brands/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: {
          _method: 'PUT',
        },
      });
      alert("Cập nhật thành công!"); // Alert on success
      navigate("/brands"); // Redirect to the brands page
    } catch (error) {
      const errMsg = error.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật thương hiệu!";
      setError(errMsg);
    }
    
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Chỉnh sửa thương hiệu</h5>
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
                placeholder="Tên thương hiệu"
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
                placeholder="Slug"
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ảnh thương hiệu</label>
              {existingImage && (
                <div className="mb-3">
                  <img src={`${existingImage}`} alt="Thương hiệu" width="100" />
                </div>
              )}
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
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
              Cập nhật thương hiệu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBrands;
