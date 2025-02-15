import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditPosts = () => {
  const { id } = useParams();
  const [postCategories, setPostCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category_posts_id: 0,
    status: false,
    image: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
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
    text = text.toLowerCase()
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
    return text;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const categoryRes = await axios.get("http://localhost:8000/api/category_posts/index", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostCategories(categoryRes.data.data);

        const response = await axios.get(`http://localhost:8000/api/posts/show/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
        setExistingImage(response.data.image);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError("Failed to fetch post data.");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost({
      ...post,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && { slug: generateSlug(value) }),
    });
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setPost((prevPost) => ({ ...prevPost, content: data }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("slug", post.slug);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("category_posts_id", post.category_posts_id);
    formData.append("status", post.status ? 1 : 0);
    if (image) formData.append("image", image);

    try {
      await axios.post(`http://localhost:8000/api/posts/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
          data: {
            _method: "put",
          },
      });
      alert("Post updated successfully!");
      navigate("/posts");
    } catch (error) {
      setError("Failed to update post.");
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Edit Post</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Post Title</label>
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
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={post.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <CKEditor
                editor={ClassicEditor}
                data={post.content}
                config={editorConfiguration}
                onChange={handleContentChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Post Image</label>
              {existingImage && (
                <div className="mb-3">
                  <img src={`${existingImage}`} alt="Post" width="100" />
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
              <label className="form-label">Category</label>
              <select
                name="category_posts_id"
                className="form-control"
                value={post.category_posts_id}
                onChange={handleChange}
              >
                <option value="0">Select a category</option>
                {postCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
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
              <label className="form-check-label">Active</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPosts;
