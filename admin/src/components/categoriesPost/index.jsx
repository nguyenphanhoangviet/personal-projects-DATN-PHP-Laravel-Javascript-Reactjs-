import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const CategoriesPosts = () => {
  const [category_posts, setCategoriesPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token không tồn tại. Vui lòng đăng nhập lại!");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/category_posts/index", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategoriesPosts(response.data.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách vai trò người dùng!");
        console.error("Lỗi khi lấy dữ liệu:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesPosts();
  }, []);

  useEffect(() => {
    if (!loading && category_posts.length > 0) {
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $('#myTable').DataTable().clear().destroy();
      }

      $('#myTable').DataTable({
        paging: true,
        searching: true,
        destroy: true,
      });
    }
  }, [loading, category_posts]);

  const deleteRole = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục bài viết này không?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token không tồn tại. Vui lòng đăng nhập lại!");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/category_posts/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoriesPosts(category_posts.filter((role) => role.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa danh mục bài viết!");
      console.error("Lỗi khi xóa:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Đang tải danh mục bài viết...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="card-header">Danh sách danh mục bài viết</h5>
          <Link to="/add-category_posts">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm danh mục bài viết
            </button>
          </Link>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Slug</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {category_posts.map((category_post) => (
                <tr key={category_post.id}>
                  <td>{category_post.id}</td>
                  <td>{category_post.name}</td>
                  <td>{category_post.slug}</td>
                  <td>
                    <span className={`badge ${category_post.status ? "bg-label-primary" : "bg-label-secondary"}`}>
                      {category_post.status ? "Hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div>
                      <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit-category_posts/${category_post.id}`}>
                        <i className="bx bx-edit-alt me-1" style={{ color: "blue" }}></i> Sửa
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteRole(category_post.id)}>
                        <i className="bx bx-trash me-1" style={{ color: "red" }}></i> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPosts;
