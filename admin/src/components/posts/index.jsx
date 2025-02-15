import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/posts/index", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data.data || []);
      } catch (error) {
        setError("Error fetching posts!");
        console.error("Error fetching posts:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!loading && posts.length > 0) {
      if ($.fn.DataTable.isDataTable("#postTable")) {
        $('#postTable').DataTable().clear().destroy();
      }
      $('#postTable').DataTable({
        paging: true,
        searching: true,
      });
    }
  }, [loading, posts]);

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/posts/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      setError("Error deleting post!");
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="card-header">Post List</h5>
          <Link to="/add-post">
            <button type="button" className="btn rounded-pill btn-primary m-6">Add Post</button>
          </Link>
        </div>
        <div className="table-responsive text-nowrap">
          <table id="postTable" className="table table-bordered ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Content</th>
                <th>Image</th>
                <th>User</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.slug}</td>
                    <td>{post.description}</td>
                    <td>{post.content}</td>
                    <td>
                      {post.image ? (
                        post.image.includes("http") ? (
                          <img src={post.image} alt={post.title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        ) : (
                          <img src={`http://localhost:8000/assets/uploads/post/${post.image}`} alt={post.title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        )
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{post.users ? post.users.name : "Chưa biết ai "}</td>

                    <td>{post.category_posts ? post.category_posts.name : "Chưa phân loại"}</td>


                    <td>
                      <span className={`badge ${post.status ? "bg-label-primary" : "bg-label-secondary"}`}>
                        {post.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div>
                        <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit-post/${post.id}`}>
                          <i className="bx bx-edit-alt me-1" style={{ color: "blue" }}></i> Edit
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deletePost(post.id)}>
                          <i className="bx bx-trash me-1" style={{ color: "red" }}></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="10">No posts available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Posts;
