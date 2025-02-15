import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("token"); // Đảm bảo sử dụng token nhất quán
        const response = await axios.get(
          "http://localhost:8000/api/brands/index",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bao gồm token trong header của yêu cầu
            },
          }
        );
        setBrands(response.data.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách thương hiệu!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    if (!loading && brands.length > 0) {
      // Kiểm tra nếu DataTable đã được khởi tạo trước đó
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $('#myTable').DataTable().clear().destroy(); // Phá hủy DataTable trước khi khởi tạo lại
      }

      // Khởi tạo lại DataTable
      $('#myTable').DataTable({
        paging: true,
        searching: true,
      });
    }
  }, [loading, brands]);

  const deleteBrand = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa thương hiệu này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Đảm bảo sử dụng token nhất quán
      await axios.delete(`http://localhost:8000/api/brands/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bao gồm token trong header của yêu cầu
        },
      });
      setBrands(brands.filter((brand) => brand.id !== id)); // Cập nhật trạng thái để xóa thương hiệu đã xóa
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa thương hiệu!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <div>Đang tải thương hiệu...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-header">Danh sách thương hiệu</h5>
          <Link to="/add-brands">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm thương hiệu
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
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>
                    {brand.image ? (
                      // Nếu có ảnh, kiểm tra loại URL
                      brand.image.includes("http") ? (
                        <img
                          src={brand.image} // Trường hợp URL đầy đủ
                          alt={brand.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src={`http://localhost:8000/assets/uploads/brand/${brand.image}`} // Trường hợp đường dẫn tương đối
                          alt={brand.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      )
                    ) : (
                      // Nếu không có ảnh
                      <p>Image not found</p>
                    )}

                    {/* Hiển thị tên thương hiệu */}
                    {brand.name}
                  </td>

                  <td>{brand.slug}</td>
                  <td>
                    <span
                      className={`badge ${
                        brand.status ? "bg-label-primary" : "bg-label-secondary"
                      }`}
                    >
                      {brand.status ? "Hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/edit-brands/${brand.id}`}
                      >
                        <i
                          className="bx bx-edit-alt me-1"
                          style={{ color: "blue" }}
                        ></i>{" "}
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteBrand(brand.id)}
                        // style={{ background: "none", border: "none" }}
                      >
                        <i
                          className="bx bx-trash me-1"
                          style={{ color: "red" }}
                        ></i>{" "}
                        Xóa
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

export default Brands;
