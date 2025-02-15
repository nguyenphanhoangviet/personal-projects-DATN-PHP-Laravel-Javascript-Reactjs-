import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "jszip/dist/jszip.min.js";
import "pdfmake/build/pdfmake.js";
import "pdfmake/build/vfs_fonts.js";
import "datatables.net-buttons/js/buttons.html5.min.js";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/categories/index",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data || []);
    } catch (error) {
      setError("Đã có lỗi xảy ra khi lấy danh mục!");
      console.error(
        "Lỗi khi lấy dữ liệu:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $("#myTable").DataTable().clear().destroy();
      }

      $("#myTable").DataTable({
        dom: "Bfrtip",
        buttons: [
          {
            extend: "csv",
            text: "Export CSV",
            action: async function (e, dt, node, config) {
              try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                  "http://localhost:8000/api/categories/export-csv",
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob",
                  }
                );

                const blob = new Blob([response.data], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "categories.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } catch (error) {
                console.error("Lỗi khi xuất CSV:", error);
              }
            },
          },
        ],
        paging: true,
        searching: true,
      });
    }
  }, [loading, categories]);

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/categories/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa danh mục!");
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/categories/import-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("File imported successfully");
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error during import:", error);
      alert("Error during import");
    }
  };

  if (loading) {
    return <div>Đang tải danh mục...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="card-header">Danh sách danh mục</h5>
          <Link to="/add-categories">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm danh mục
            </button>
          </Link>
        </div>
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleImport} className="btn btn-outline-primary ml-2">
            Import CSV
          </button>
        </div>
        <div className="table-responsive text-nowrap">
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Slug</th>
                <th>Thuộc danh mục</th>
                <th>Hiện trên trang chủ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>
                      {category.parent_id === 0
                        ? "Danh mục cha"
                        : categories.find(
                            (sub_category) =>
                              sub_category.id === category.parent_id
                          )?.name || "Danh mục không xác định"}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          category.showHome
                            ? "bg-label-primary"
                            : "bg-label-secondary"
                        }`}
                      >
                        {category.showHome ? "Hiện" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          category.status
                            ? "bg-label-primary"
                            : "bg-label-secondary"
                        }`}
                      >
                        {category.status ? "Hoạt động" : "Ngưng hoạt động"}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/edit-categories/${category.id}`}
                      >
                        <i
                          className="bx bx-edit-alt me-1"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <i
                          className="bx bx-trash me-1"
                          style={{ color: "red" }}
                        ></i>{" "}
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;