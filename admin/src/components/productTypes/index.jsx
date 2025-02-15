import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const ProductTypes = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const token = localStorage.getItem("token"); // Đảm bảo sử dụng token nhất quán
        const response = await axios.get(
          "http://localhost:8000/api/product_types/index",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bao gồm token trong header của yêu cầu
            },
          }
        );
        setProductTypes(response.data.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách dạng sản phẩm!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (!loading && productTypes.length > 0) {
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
  }, [loading, productTypes]);

  const deleteProductType = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa dạng sản phẩm này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token"); // Đảm bảo sử dụng token nhất quán
      await axios.delete(`http://localhost:8000/api/product_types/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Bao gồm token trong header của yêu cầu
        },
      });
      setProductTypes(productTypes.filter((type) => type.id !== id)); // Cập nhật trạng thái để xóa thương hiệu đã xóa
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa thương hiệu!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <div>Đang tải dạng sản phẩm...</div>;
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
          <h5 className="card-header">Danh sách dạng sản phẩm</h5>
          <Link to="/add-product-types">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm dạng sản phẩm
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
              {productTypes.map((type) => (
                <tr key={type.id}>
                  <td>{type.id}</td>
                  <td>
                    {type.name}
                  </td>
                  <td>{type.slug}</td>
                  <td>
                    <span
                      className={`badge ${
                        type.status ? "bg-label-primary" : "bg-label-secondary"
                      }`}
                    >
                      {type.status ? "Hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div>
                      <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit-product-types/${type.id}`}>
                        <i className="bx bx-edit-alt me-1" style={{ color: "blue" }}></i> Sửa 
                      </Link>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProductType(type.id)} 
                      // style={{ background: "none", border: "none" }}
                      >
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

export default ProductTypes;
