import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/banners/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBanners(response.data.data);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : "Đã có lỗi xảy ra khi lấy danh sách quảng cáo!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (!loading && banners.length > 0) {
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
  }, [loading, banners]);

  const deleteBanner = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa quảng cáo này không?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/banners/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBanners(banners.filter((banner) => banner.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa quảng cáo!");
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // You can add a spinner here
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-header">Danh sách quảng cáo trực tuyến</h5>
          <Link to="/add-banners">
            <button type="button" className="btn rounded-pill btn-primary">
              Thêm quảng cáo trực tuyến
            </button>
          </Link>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Miêu tả</th>
                <th>Kích cỡ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td>{banner.id}</td>
                  <td>
                    {banner.image_path ? (
                      <img
                        src={`http://localhost:8000/assets/uploads/banner/${
                          banner.size === 1
                            ? "banner800x600"
                            : banner.size === 2
                            ? "banner650x250"
                            : banner.size === 3
                            ? "banner525x425"
                            : banner.size === 4
                            ? "banner250x200"
                            : "banner400x125"
                        }/${banner.image_path}`}
                        alt={banner.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                    ) : (
                      <p>Không có ảnh</p>
                    )}
                    {banner.name}
                  </td>

                  <td>{banner.description}</td>
                  <td>
                    <select
                      name="size"
                      value={banner.size}
                      className="form-control"
                      disabled
                    >
                      <option value={1}>800x600</option>
                      <option value={2}>650x250</option>
                      <option value={3}>525x425</option>
                      <option value={4}>250x200</option>
                      <option value={5}>400x125</option>
                    </select>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        banner.status
                          ? "bg-label-primary"
                          : "bg-label-secondary"
                      }`}
                    >
                      {banner.status ? "Hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/edit-banners/${banner.id}`}
                      >
                        <i className="bx bx-edit-alt me-1" /> Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteBanner(banner.id)}
                      >
                        <i className="bx bx-trash me-1" /> Xóa
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

export default Banners;
