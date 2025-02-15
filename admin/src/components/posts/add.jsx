import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";




import { jwtDecode } from 'jwt-decode'; // Updated import

const AddPosts = () => {
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category_posts_id: 0,
    status: false,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const editorConfiguration = {
    toolbar: [
      "heading",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
      "alignment",
      "code",
      "codeBlock",
      "findAndReplace",
      "fontColor",
      "fontFamily",
      "fontSize",
      "fontBackgroundColor",
      "highlight",
      "horizontalLine",
      "htmlEmbed",
      "imageInsert",
    ],
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

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
      .replace(/[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
    return text;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const categoryRes = await axios.get(
          "http://localhost:8000/api/category_posts/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(categoryRes.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost({
      ...post,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && { slug: generateSlug(value) }),
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.sub; // Assuming 'sub' contains the user ID

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("slug", post.slug);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("category_posts_id", post.category_posts_id);
    formData.append("status", post.status ? 1 : 0);
    formData.append("user_id", userId); // Add user ID here
    if (image) {
      formData.append("image", image); // Add image to form data if selected
    }

    try {
      await axios.post("http://localhost:8000/api/posts/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPost({
        title: "",
        slug: "",
        description: "",
        content: "",
        category_posts_id: 0,
        status: false,
      });
      setImage(null);
      alert("Bài viết được thêm thành công!");
      navigate("/posts");
    } catch (error) {
      setError(
        error.response?.data?.message || "Đã có lỗi xảy ra khi thêm bài viết!"
      );
      console.error(
        "Lỗi thêm bài viết:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Thêm bài viết mới</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tiêu đề bài viết</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={post.title}
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
                value={post.slug}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ảnh bài viết</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={post.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nội dung</label>
              <CKEditor
                editor={ClassicEditor}
                data={post.content}
                config={editorConfiguration}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPost({ ...post, content: data });
                }}
                
                
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Danh mục bài viết</label>
              <select
                name="category_posts_id"
                className="form-control"
                value={post.category_posts_id || "0"}
                onChange={handleChange}
              >
                <option value="0">Chọn danh mục</option>
                {categories.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={post.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Kích hoạt</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Thêm bài viết
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPosts;
