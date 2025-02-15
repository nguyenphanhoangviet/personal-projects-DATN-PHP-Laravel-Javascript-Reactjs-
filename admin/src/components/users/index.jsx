import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Users = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLockChange = (e, id) => {
    const { value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, lock: value } : user
      )
    );
  };

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const token = localStorage.getItem("token");

        const roleRes = await axios.get(
          "http://localhost:8000/api/roles/index", // Fetching roles API
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoles(roleRes.data.data);

        const userRes = await axios.get(
          "http://localhost:8000/api/users/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(userRes.data.data);
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách người dùng!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRoles();
  }, []);

  useEffect(() => {
    if (!loading && users.length > 0) {
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
  }, [loading, users]);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/users/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa người dùng!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const ChangeLockUser = async (id) => {
    const confirmChange = window.confirm(
      "Bạn có chắc chắn muốn thay đổi trạng thái khóa của người dùng này không?"
    );
    if (!confirmChange) return;

    try {
      const token = localStorage.getItem("token");
      const selectedUser = users.find((user) => user.id === id);
      await axios.post(
        `http://localhost:8000/api/users/change_user_lock/${id}`,
        { lock: selectedUser.lock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Cập nhật thành công!");
    } catch (error) {
      setError("Đã có lỗi xảy ra khi thay đổi trạng thái khóa người dùng!");
      console.error(
        "Lỗi khi thay đổi trạng thái khóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <div>Đang tải người dùng...</div>;
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
          <h5 className="card-header">Danh sách người dùng</h5>
          <Link to="/add-users">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm người dùng
            </button>
          </Link>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ảnh đại diện</th>
                <th>Tên</th>
                <th>Vai trò</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.image ? (
                      user.image.includes("http") ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src={`http://localhost:8000/assets/uploads/user/${user.image}`}
                          alt={user.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      )
                    ) : (
                      <p>Image not found</p>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>
                    {/* Match user.role_id with the role.id to display role name */}
                    {roles.find((role) => role.id === user.role_id)?.name ||
                      "Chưa phân loại"}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <select
                      name="lock"
                      value={user.lock}
                      onChange={(e) => handleLockChange(e, user.id)}
                      className="form-control"
                    >
                      <option value={0} className="bg-primary">
                        Không khóa
                      </option>
                      <option value={1} className="bg-danger">
                        Khóa
                      </option>
                    </select>
                  </td>
                  <td>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => ChangeLockUser(user.id)}
                      >
                        <i className="bx bx-key me-1" style={{ color: "blue" }}></i>{" "}
                        Cập nhật
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        <i className="bx bx-trash me-1" style={{ color: "red" }}></i>{" "}
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

export default Users;
