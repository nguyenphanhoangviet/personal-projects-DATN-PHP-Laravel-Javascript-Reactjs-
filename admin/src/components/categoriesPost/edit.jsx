import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategoryPost = () => {
  const { id } = useParams(); // Get category_post ID from URL
  const [categoryPost, setCategoryPost] = useState({
    name: "",
    slug: "",
    status: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Slug generation function
  const generateSlug = (text) => {
    text = text.toLowerCase();
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d");
      
    text = text.replace(
      /[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g,
      ""
    );
    text = text.replace(/\s+/g, "-").replace(/-+/g, "-").trim("-");
    return text;
  };

  useEffect(() => {
    const fetchCategoryPost = async () => {
      const token = localStorage.getItem("token");
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:8000/api/category_posts/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoryPost(response.data);
      } catch (error) {
        setError("Error fetching category post details.");
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCategoryPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategoryPost({
      ...categoryPost,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && { slug: generateSlug(value) }), // Update slug when name changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", categoryPost.name);
    formData.append("slug", categoryPost.slug);
    formData.append("status", categoryPost.status ? 1 : 0);
    setLoading(true); // Start loading

    try {
      await axios.post(
        `http://localhost:8000/api/category_posts/update/${id}`,
        categoryPost,
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
      navigate("/category_posts");
    } catch (error) {
      setError("Error updating the category post.");
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
        <h5 className="card-header">Chỉnh sửa danh mục bài viết</h5>
        <div className="card-body">
          {loading && <div>Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={categoryPost.name}
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
                value={categoryPost.slug}
                readOnly
              />
            </div>
           
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={categoryPost.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Hoạt động</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Cập nhật danh mục bài viết
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPost;
