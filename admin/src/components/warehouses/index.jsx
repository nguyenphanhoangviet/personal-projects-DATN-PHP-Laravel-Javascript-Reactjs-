import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token không tồn tại. Vui lòng đăng nhập lại!");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/api/warehouses/index", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWarehouses(response.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách kho hàng!");
        console.error("Lỗi khi lấy dữ liệu:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (!loading && warehouses.length > 0) {
      if ($.fn.DataTable.isDataTable("#warehouseTable")) {
        $('#warehouseTable').DataTable().clear().destroy();
      }
      $('#warehouseTable').DataTable({
        paging: true,
        searching: true,
        destroy: true,
      });
    }
  }, [loading, warehouses]);

  const deleteWarehouse = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa kho hàng này không?");
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token không tồn tại. Vui lòng đăng nhập lại!");
      return;
    }
    try {
      await axios.delete(`http://localhost:8000/api/warehouses/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa kho hàng!");
      console.error("Lỗi khi xóa:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <div>Đang tải danh sách kho hàng...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="card-header">Danh sách kho hàng</h5>
          <Link to="/add-warehouse">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm kho hàng
            </button>
          </Link>
        </div>
        <div className="table-responsive text-nowrap">
          <table id="warehouseTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vị trí</th>
                <th>Quản lý</th>
                <th>Sản phẩm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.id}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.user ? warehouse.user.name : "N/A"}</td>
                  <td>
                    {warehouse.products && warehouse.products.length > 0 ? (
                      warehouse.products.map((product) => (
                        <div key={product.id}>
                          {product.name} - Số lượng: {product.pivot.quantity}
                        </div>
                      ))
                    ) : (
                      "Không có sản phẩm"
                    )}
                  </td>
                  <td>
                    <div>
                      <Link className="btn btn-sm btn-outline-info me-2" to={`/view-warehouse/${warehouse.id}`}>
                        <i className="bx bx-show me-1 text-info"></i> Xem
                      </Link>
                      <Link className="btn btn-sm btn-outline-primary me-2" to={`/edit-warehouse/${warehouse.id}`}>
                        <i className="bx bx-edit-alt me-1" style={{ color: "blue" }}></i> Sửa
                      </Link>
                      <button className="btn btn-sm btn-outline-danger me-2" onClick={() => deleteWarehouse(warehouse.id)}>
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

export default Warehouses;
