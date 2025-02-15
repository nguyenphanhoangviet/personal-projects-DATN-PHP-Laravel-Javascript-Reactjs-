import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCategories = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    sort_order: 0,
    parent_id: 0,
    showHome: false,
    status: false,
    image: "",
  });
  const [image, setImage] = useState(null); // Để lưu trữ hình ảnh đã chọn
  const [existingImage, setExistingImage] = useState(null); // Để hiển thị hình ảnh hiện có
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Để điều hướng

  const generateSlug = (text) => {
    // Convert to lowercase
    text = text.toLowerCase();

    // Replace accented characters with non-accented equivalents (similar to your PHP function)
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d");

    // Remove special characters
    text = text.replace(
      /[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g,
      ""
    );

    // Replace spaces with dashes
    text = text.replace(/\s+/g, "-");

    // Replace multiple dashes with a single dash
    text = text.replace(/-+/g, "-");

    // Trim dashes from the beginning and end
    return text.trim("-");
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const categoryRes = await axios.get(
          "http://localhost:8000/api/categories/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(categoryRes.data);
        const response = await axios.get(
          `http://localhost:8000/api/categories/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(response.data);
        setExistingImage(response.data.image); // Đặt hình ảnh hiện có (nếu có)
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh mục!");
        console.error(
          "Lỗi lấy:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategory({
      ...category,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && { slug: generateSlug(value) }), // Automatically update slug when the name changes
    });
  };

  // Xử lý thay đổi tệp cho hình ảnh
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Sử dụng FormData để xử lý dữ liệu văn bản và tệp
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("slug", category.slug);
    formData.append("sort_order", category.sort_order);
    formData.append("parent_id", category.parent_id);
    formData.append("showHome", category.showHome ? 1 : 0);
    formData.append("status", category.status ? 1 : 0);
    if (image) {
      formData.append("image", image); // Thêm hình ảnh mới nếu đã chọn
    }

    try {
      await axios.post(
        `http://localhost:8000/api/categories/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: {
            _method: "PUT",
          },
        }
      );
      alert("Cập nhật thành công!");
      navigate("/categories"); // Chuyển hướng đến danh sách danh mục sau khi cập nhật thành công
    } catch (error) {
      setError("Đã có lỗi xảy ra khi cập nhật danh mục!");
      console.error(
        "Lỗi cập nhật:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Chỉnh sửa danh mục</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={category.name}
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
                value={category.slug}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ảnh danh mục</label>
              {existingImage && (
                <div className="mb-3">
                  <img src={`${existingImage}`} alt="Danh mục" width="100" />
                </div>
              )}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số thứ tự</label>
              <input
                type="number"
                className="form-control"
                name="sort_order"
                value={category.sort_order}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
  <label className="form-label">Thuộc Danh mục</label>
  <select
    name="parent_id"
    className="form-control input-sm m-bot15"
    value={category.parent_id || "0"}
    onChange={handleChange}
  >
    <option value="0">-------Danh mục cha-------</option>

    {categories.map((val) => {
      // Add indentation based on the category level
      let indent = "";
      for (let i = 1; i < val.level; i++) {
        indent += "--- ";
      }

      return (
        <option key={val.id} value={val.id}>
          {indent} {val.name}
        </option>
      );
    })}
  </select>
</div>


            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="showHome"
                checked={category.showHome}
                onChange={handleChange}
              />
              <label className="form-check-label">Hiện trên trang chủ</label>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={category.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Kích hoạt</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật danh mục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
